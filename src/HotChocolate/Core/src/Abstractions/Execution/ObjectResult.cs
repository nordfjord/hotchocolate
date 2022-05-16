using System;
using System.Buffers;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace HotChocolate.Execution;

/// <summary>
/// Represents an optimized object result that is used by the execution engine
/// to store completed values.
/// </summary>
public sealed class ObjectResult
    : IResultData
    , IReadOnlyDictionary<string, object?>
    , IEnumerable<ObjectFieldResult>
{
    private ObjectFieldResult[] _buffer = { new(), new(), new(), new() };
    private int _capacity;

    /// <inheritdoc cref="IResultData.Parent"/>
    public IResultData? Parent { get; internal set; }

    /// <summary>
    /// Gets the capacity of this object result.
    /// It essentially specifies how many field results can be stored.
    /// </summary>
    internal int Capacity => _capacity;

    /// <summary>
    /// This indexer allows direct access to the underlying buffer
    /// to access a <see cref="ObjectFieldResult"/>.
    /// </summary>
    internal ObjectFieldResult this[int index] => _buffer[index];

    /// <summary>
    /// Gets a reference to the first <see cref="ObjectFieldResult"/> in the buffer.
    /// </summary>
    internal ref ObjectFieldResult GetReference()
        => ref MemoryMarshal.GetReference(_buffer.AsSpan());

    /// <summary>
    /// Sets a field value in the buffer.
    /// Note: Set will not validate if the buffer has enough space.
    /// </summary>
    /// <param name="index">
    /// The index in the buffer on which the value shall be stored.
    /// </param>
    /// <param name="name">
    /// The name of the field.
    /// </param>
    /// <param name="value">
    /// The field value.
    /// </param>
    /// <param name="isNullable">
    /// Specifies if the value is allowed to be null.
    /// </param>
    internal void SetValueUnsafe(int index, string name, object? value, bool isNullable = true)
        => _buffer[index].Set(name, value, isNullable);

    /// <summary>
    /// Removes a field value from the buffer.
    /// Note: Remove will not validate if the buffer has enough space.
    /// </summary>
    /// <param name="index">
    /// The index in the buffer on which the value shall be removed.
    /// </param>
    internal void RemoveValueUnsafe(int index)
        => _buffer[index].Reset();

    /// <summary>
    /// Searches within the capacity of the buffer to find a field value that matches
    /// the specified <paramref name="name"/>.
    /// </summary>
    /// <param name="name">
    /// The name of the field to search for.
    /// </param>
    /// <param name="index">
    /// The index on the buffer where the field value is located.
    /// </param>
    /// <returns>
    /// Returns the field value or null.
    /// </returns>
    internal ObjectFieldResult? TryGetValue(string name, out int index)
    {
        var i = (IntPtr)0;
        var length = _capacity;
        ref ObjectFieldResult searchSpace = ref MemoryMarshal.GetReference(_buffer.AsSpan());

        while (length > 0)
        {
            var otherName = Unsafe.Add(ref searchSpace, i).Name;
            if (name.Equals(otherName, StringComparison.Ordinal))
            {
                index = i.ToInt32();
                return _buffer[index];
            }

            length--;
            i += 1;
        }

        index = -1;
        return default;
    }

    /// <summary>
    /// Ensures that the result object has enough capacity on the buffer
    /// to store the expected fields.
    /// </summary>
    /// <param name="capacity">
    /// The capacity needed.
    /// </param>
    internal void EnsureCapacity(int capacity)
    {
        if (_capacity > 0)
        {
            Reset();
        }

        if (_buffer.Length < capacity)
        {
            var oldCapacity = _buffer.Length;
            var newCapacity = _buffer.Length * 2;

            if (newCapacity < capacity)
            {
                newCapacity = capacity;
            }

            Array.Resize(ref _buffer, newCapacity);

            for (var i = oldCapacity; i < _buffer.Length; i++)
            {
                _buffer[i] = new();
            }
        }

        _capacity = capacity;
    }

    /// <summary>
    /// Resets the result object.
    /// </summary>
    internal void Reset()
    {
        if (_capacity > 4)
        {
            var i = (IntPtr)0;
            var length = _capacity;
            ref ObjectFieldResult searchSpace = ref MemoryMarshal.GetReference(_buffer.AsSpan());

            while (length > 0)
            {
                Unsafe.Add(ref searchSpace, i).Reset();
                length--;
                i += 1;
            }
        }
        else
        {
            for (var j = _capacity - 1; j >= 0; j--)
            {
                _buffer[j].Reset();
            }
        }

        _capacity = 0;
    }

    object? IReadOnlyDictionary<string, object?>.this[string key]
        => TryGetValue(key, out _)?.Value;

    IEnumerable<string> IReadOnlyDictionary<string, object?>.Keys
    {
        get
        {
            for (var i = 0; i < _capacity; i++)
            {
                ObjectFieldResult field = _buffer[i];

                if (field.IsInitialized)
                {
                    yield return field.Name;
                }
            }
        }
    }

    IEnumerable<object?> IReadOnlyDictionary<string, object?>.Values
    {
        get
        {
            for (var i = 0; i < _capacity; i++)
            {
                ObjectFieldResult field = _buffer[i];

                if (field.IsInitialized)
                {
                    yield return field.Value;
                }
            }
        }
    }

    int IReadOnlyCollection<KeyValuePair<string, object?>>.Count => _capacity;

    bool IReadOnlyDictionary<string, object?>.ContainsKey(string key)
        => TryGetValue(key, out _)?.Name is not null;

    bool IReadOnlyDictionary<string, object?>.TryGetValue(string key, out object? value)
    {
        ObjectFieldResult? field = TryGetValue(key, out _);

        if(field?.Name is not null)
        {
            value = field.Value;
            return true;
        }

        value = null;
        return true;
    }

    public IEnumerator<ObjectFieldResult> GetEnumerator()
    {
        for (var i = 0; i < _capacity; i++)
        {
            ObjectFieldResult field = _buffer[i];

            if (field.IsInitialized)
            {
                yield return field;
            }
        }
    }

    IEnumerator<KeyValuePair<string, object?>> IEnumerable<KeyValuePair<string, object?>>.GetEnumerator()
    {
        for (var i = 0; i < _capacity; i++)
        {
            ObjectFieldResult field = _buffer[i];

            if (field.IsInitialized)
            {
                yield return new KeyValuePair<string, object?>(field.Name, field.Value);
            }
        }
    }

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}

/// <summary>
/// Represents an optimized list result that is used by the execution engine
/// to store completed elements.
/// </summary>
public sealed class ListResult : ListResultBase<object>
{

}

/// <summary>
/// Represents an optimized object list result that is used by the execution engine
/// to store completed elements.
/// </summary>
public sealed class ObjectListResult : ListResultBase<ObjectResult>
{
}

public abstract class ListResultBase<T> : IResultData, IReadOnlyList<T?>
{
    private T?[] _buffer = new T?[4];
    private int _capacity;
    private int _count;

    /// <inheritdoc cref="IResultData.Parent"/>
    public IResultData? Parent { get; internal set; }

    public int Capacity => _capacity;

    /// <inheritdoc cref="IReadOnlyCollection{T}.Count"/>
    public int Count => _count;

    /// <inheritdoc cref="IReadOnlyList{T}.this"/>
    public T? this[int index]
    {
        get
        {
            return _buffer[index];
        }
    }

    /// <summary>
    /// Defines if the elements of this list are nullable.
    /// </summary>
    internal bool IsNullable { get; set; }

    internal void AddUnsafe(T? item)
        => _buffer[_count++] = item;

    internal void SetUnsafe(int index, T? item)
        => _buffer[index] = item;

    /// <summary>
    /// Ensures that the result object has enough capacity on the buffer
    /// to store the expected fields.
    /// </summary>
    /// <param name="capacity">
    /// The capacity needed.
    /// </param>
    internal void EnsureCapacity(int capacity)
    {
        if (_capacity > 0)
        {
            Reset();
        }

        if (_buffer.Length < capacity)
        {
            var newCapacity = _buffer.Length * 2;

            if (newCapacity < capacity)
            {
                newCapacity = capacity;
            }

            Array.Resize(ref _buffer, newCapacity);
        }

        _capacity = capacity;
    }

    /// <summary>
    /// Grows the internal capacity.
    /// </summary>
    internal void Grow()
    {
        var capacity = _capacity * 2;

        if (_buffer.Length < capacity)
        {
            var newCapacity = _buffer.Length * 2;

            if (newCapacity < capacity)
            {
                newCapacity = capacity;
            }

            Array.Resize(ref _buffer, newCapacity);
        }

        _capacity = capacity;
    }

    /// <summary>
    /// Resets the result object.
    /// </summary>
    internal void Reset()
    {
        if (_capacity > 0)
        {
            _buffer.AsSpan().Slice(0, _capacity).Clear();
            _capacity = 0;
            _count = 0;
        }
    }

    /// <inheritdoc cref="IEnumerable{T}.GetEnumerator"/>
    public IEnumerator<T?> GetEnumerator()
    {
        for (var i = 0; i < _capacity; i++)
        {
            yield return _buffer[i];
        }
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}


