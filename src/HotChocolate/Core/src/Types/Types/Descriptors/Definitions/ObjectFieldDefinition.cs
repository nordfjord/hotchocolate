using System;
using System.Buffers;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using HotChocolate.Internal;
using HotChocolate.Resolvers;
using HotChocolate.Utilities;

#nullable enable

namespace HotChocolate.Types.Descriptors.Definitions;

/// <summary>
/// The <see cref="ObjectFieldDefinition"/> contains the settings
/// to create a <see cref="ObjectField"/>.
/// </summary>
public class ObjectFieldDefinition : OutputFieldDefinitionBase
{
    private List<FieldMiddlewareDefinition>? _middlewareDefinitions;
    private List<ResultFormatterDefinition>? _resultConverters;
    private List<IParameterExpressionBuilder>? _expressionBuilders;
    private List<object>? _customSettings;
    private bool _middlewareDefinitionsCleaned;
    private bool _resultConvertersCleaned;

    /// <summary>
    /// Initializes a new instance of <see cref="ObjectTypeDefinition"/>.
    /// </summary>
    public ObjectFieldDefinition()
    {
        IsParallelExecutable = true;
    }

    /// <summary>
    /// Initializes a new instance of <see cref="ObjectTypeDefinition"/>.
    /// </summary>
    public ObjectFieldDefinition(
        string name,
        string? description = null,
        ITypeReference? type = null,
        FieldResolverDelegate? resolver = null,
        PureFieldDelegate? pureResolver = null)
    {
        Name = name.EnsureGraphQLName();
        Description = description;
        Type = type;
        Resolver = resolver;
        PureResolver = pureResolver;
        IsParallelExecutable = true;
    }

    /// <summary>
    /// The object runtime type.
    /// </summary>
    public Type? SourceType { get; set; }

    /// <summary>
    /// The resolver type that exposes the resolver member.
    /// </summary>
    public Type? ResolverType { get; set; }

    /// <summary>
    /// The member on the <see cref="SourceType" />.
    /// </summary>
    public MemberInfo? Member { get; set; }

    /// <summary>
    /// Defines a binding to another object field.
    /// </summary>
    public ObjectFieldBinding? BindToField { get; set; }

    /// <summary>
    /// The member that represents the resolver.
    /// </summary>
    public MemberInfo? ResolverMember { get; set; }

    /// <summary>
    /// The expression that represents the resolver.
    /// </summary>
    public Expression? Expression { get; set; }

    /// <summary>
    /// The result type of the resolver.
    /// </summary>
    public Type? ResultType { get; set; }

    /// <summary>
    /// The delegate that represents the resolver.
    /// </summary>
    public FieldResolverDelegate? Resolver { get; set; }

    /// <summary>
    /// The delegate that represents an optional pure resolver.
    /// </summary>
    public PureFieldDelegate? PureResolver { get; set; }

    /// <summary>
    /// Gets or sets all resolvers at once.
    /// </summary>
    public FieldResolverDelegates Resolvers
    {
        get => GetResolvers();
        set
        {
            Resolver = value.Resolver;
            PureResolver = value.PureResolver;
        }
    }

    /// <summary>
    /// The delegate that represents the pub-/sub-system subscribe delegate to open an
    /// event stream in case this field represents a subscription.
    /// </summary>
    public SubscribeResolverDelegate? SubscribeResolver { get; set; }

    /// <summary>
    /// A list of middleware components which will be used to form the field pipeline.
    /// </summary>
    public IList<FieldMiddlewareDefinition> MiddlewareDefinitions
    {
        get
        {
            _middlewareDefinitionsCleaned = false;
            return _middlewareDefinitions ??= new List<FieldMiddlewareDefinition>();
        }
    }

    /// <summary>
    /// A list of formatters that can transform the resolver result.
    /// </summary>
    public IList<ResultFormatterDefinition> ResultFormatterDefinitions
    {
        get
        {
            _resultConvertersCleaned = false;
            return _resultConverters ??= new List<ResultFormatterDefinition>();
        }
    }

    /// <summary>
    /// A list of parameter expression builders that shall be applied when compiling
    /// the resolver or when arguments are inferred from a method.
    /// </summary>
    public IList<IParameterExpressionBuilder> ParameterExpressionBuilders
    {
        get
        {
            return _expressionBuilders ??= new List<IParameterExpressionBuilder>();
        }
    }

    /// <summary>
    /// A list of custom settings objects that can be used in the type interceptors.
    /// Custom settings are not copied to the actual type system object.
    /// </summary>
    public IList<object> CustomSettings
        => _customSettings ??= new List<object>();

    /// <summary>
    /// Defines if this field configuration represents an introspection field.
    /// </summary>
    public bool IsIntrospectionField
    {
        get => (Flags & FieldFlags.Introspection) == FieldFlags.Introspection;
        internal set
        {
            if (value)
            {
                Flags |= FieldFlags.Introspection;
            }
            else
            {
                Flags &= ~FieldFlags.Introspection;
            }
        }
    }

    /// <summary>
    /// Defines if this field can be executed in parallel with other fields.
    /// </summary>
    public bool IsParallelExecutable
    {
        get => (Flags & FieldFlags.ParallelExecutable) == FieldFlags.ParallelExecutable;
        set
        {
            if (value)
            {
                Flags |= FieldFlags.ParallelExecutable;
            }
            else
            {
                Flags &= ~FieldFlags.ParallelExecutable;
            }
        }
    }

    /// <summary>
    /// Defines that the resolver pipeline returns an
    /// <see cref="IAsyncEnumerable{T}"/> as its result.
    /// </summary>
    public bool HasStreamResult
    {
        get => (Flags & FieldFlags.Stream) == FieldFlags.Stream;
        set
        {
            if (value)
            {
                Flags |= FieldFlags.Stream;
            }
            else
            {
                Flags &= ~FieldFlags.Stream;
            }
        }
    }

    /// <summary>
    /// A list of middleware components which will be used to form the field pipeline.
    /// </summary>
    internal IReadOnlyList<FieldMiddlewareDefinition> GetMiddlewareDefinitions()
    {
        if (_middlewareDefinitions is null)
        {
            return Array.Empty<FieldMiddlewareDefinition>();
        }

        CleanMiddlewareDefinitions(_middlewareDefinitions, ref _middlewareDefinitionsCleaned);

        return _middlewareDefinitions;
    }

    /// <summary>
    /// A list of converters that can transform the resolver result.
    /// </summary>
    internal IReadOnlyList<ResultFormatterDefinition> GetResultConverters()
    {
        if (_resultConverters is null)
        {
            return Array.Empty<ResultFormatterDefinition>();
        }

        CleanMiddlewareDefinitions(_resultConverters, ref _resultConvertersCleaned);

        return _resultConverters;
    }

    /// <summary>
    /// A list of parameter expression builders that shall be applied when compiling
    /// the resolver or when arguments are inferred from a method.
    /// </summary>
    internal IReadOnlyList<IParameterExpressionBuilder> GetParameterExpressionBuilders()
    {
        if (_expressionBuilders is null)
        {
            return Array.Empty<IParameterExpressionBuilder>();
        }

        return _expressionBuilders;
    }

    /// <summary>
    /// A list of custom settings objects that can be user in the type interceptors.
    /// Custom settings are not copied to the actual type system object.
    /// </summary>
    internal IReadOnlyList<object> GetCustomSettings()
    {
        if (_customSettings is null)
        {
            return Array.Empty<object>();
        }

        return _customSettings;
    }

    private FieldResolverDelegates GetResolvers()
        => new(Resolver, PureResolver);

    internal void CopyTo(ObjectFieldDefinition target)
    {
        base.CopyTo(target);

        if (_middlewareDefinitions is { Count: > 0 })
        {
            target._middlewareDefinitions = new(_middlewareDefinitions);
            _middlewareDefinitionsCleaned = false;
        }

        if (_resultConverters is { Count: > 0 })
        {
            target._resultConverters = new(_resultConverters);
            _resultConvertersCleaned = false;
        }

        if (_expressionBuilders is { Count: > 0 })
        {
            target._expressionBuilders = new(_expressionBuilders);
        }

        if (_customSettings is { Count: > 0 })
        {
            target._customSettings = new(_customSettings);
        }

        target.SourceType = SourceType;
        target.ResolverType = ResolverType;
        target.Member = Member;
        target.BindToField = BindToField;
        target.ResolverMember = ResolverMember;
        target.Expression = Expression;
        target.ResultType = ResultType;
        target.Resolver = Resolver;
        target.PureResolver = PureResolver;
        target.SubscribeResolver = SubscribeResolver;
        target.IsIntrospectionField = IsIntrospectionField;
        target.IsParallelExecutable = IsParallelExecutable;
        target.HasStreamResult = HasStreamResult;
    }

    internal void MergeInto(ObjectFieldDefinition target)
    {
        base.MergeInto(target);

        if (_middlewareDefinitions is { Count: > 0 })
        {
            target._middlewareDefinitions ??= new List<FieldMiddlewareDefinition>();
            target._middlewareDefinitions.AddRange(_middlewareDefinitions);
            _middlewareDefinitionsCleaned = false;
        }

        if (_resultConverters is { Count: > 0 })
        {
            target._resultConverters ??= new List<ResultFormatterDefinition>();
            target._resultConverters.AddRange(_resultConverters);
            _resultConvertersCleaned = false;
        }

        if (_expressionBuilders is { Count: > 0 })
        {
            target._expressionBuilders ??= new List<IParameterExpressionBuilder>();
            target._expressionBuilders.AddRange(_expressionBuilders);
        }

        if (_customSettings is { Count: > 0 })
        {
            target._customSettings ??= new List<object>();
            target._customSettings.AddRange(_customSettings);
        }

        if (!IsParallelExecutable)
        {
            target.IsParallelExecutable = false;
        }

        if (!HasStreamResult)
        {
            target.HasStreamResult = false;
        }

        if (ResolverType is not null)
        {
            target.ResolverType = ResolverType;
        }

        if (Member is not null)
        {
            target.Member = Member;
        }

        if (ResolverMember is not null)
        {
            target.ResolverMember = ResolverMember;
        }

        if (Expression is not null)
        {
            target.Expression = Expression;
        }

        if (ResultType is not null)
        {
            target.ResultType = ResultType;
        }

        if (Resolver is not null)
        {
            target.Resolver = Resolver;
        }

        if (PureResolver is not null)
        {
            target.PureResolver = PureResolver;
        }

        if (SubscribeResolver is not null)
        {
            target.SubscribeResolver = SubscribeResolver;
        }
    }

    private static void CleanMiddlewareDefinitions<T>(
        IList<T> definitions,
        ref bool definitionsCleaned)
        where T : IMiddlewareDefinition
    {
        var count = definitions.Count;

        if (!definitionsCleaned && count > 1)
        {
            if (count == 2 && definitions[0].IsRepeatable)
            {
                definitionsCleaned = true;
            }

            if (count == 3 &&
                definitions[0].IsRepeatable &&
                definitions[1].IsRepeatable &&
                definitions[2].IsRepeatable)
            {
                definitionsCleaned = true;
            }

            if (count == 4 &&
                definitions[0].IsRepeatable &&
                definitions[1].IsRepeatable &&
                definitions[2].IsRepeatable &&
                definitions[3].IsRepeatable)
            {
                definitionsCleaned = true;
            }


            if (!definitionsCleaned)
            {
                var nonRepeatable = 0;

                foreach (var def in definitions)
                {
                    if (!def.IsRepeatable && def.Key is not null)
                    {
                        nonRepeatable++;
                    }
                }

                if (nonRepeatable > 1)
                {
                    var keys = ArrayPool<string>.Shared.Rent(nonRepeatable);

                    // we clear the section of the array we need before we are using it.
                    keys.AsSpan().Slice(0, nonRepeatable).Clear();
                    int i = 0, ki = 0;

                    do
                    {
                        IMiddlewareDefinition def = definitions[i];

                        if (def.IsRepeatable || def.Key is null)
                        {
                            i++;
                        }
                        else
                        {
                            if (ki > 0)
                            {
                                if (Array.IndexOf(keys, def.Key, 0, ki) != -1)
                                {
                                    count--;
                                    definitions.RemoveAt(i);
                                    continue;
                                }
                            }

                            keys[ki++] = def.Key;
                            i++;
                        }
                    } while (i < count);

                    ArrayPool<string>.Shared.Return(keys);
                }

                definitionsCleaned = true;
            }
        }
    }
}
