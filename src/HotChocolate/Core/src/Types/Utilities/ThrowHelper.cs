using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Globalization;
using System.Linq;
using System.Reflection;
using HotChocolate.Language;
using HotChocolate.Properties;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using static HotChocolate.Properties.TypeResources;

namespace HotChocolate.Utilities;

internal static class ThrowHelper
{
    public static ArgumentException String_NullOrEmpty(
        string parameterName) =>
        new ArgumentException(
            $@"'{parameterName}' cannot be null or empty",
            parameterName);

    public static GraphQLException EventMessage_InvalidCast(
        Type expectedType,
        Type messageType) =>
        new GraphQLException(
            ErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_EventMessage_InvalidCast,
                    messageType.FullName!,
                    expectedType.FullName!)
                .Build());

    public static GraphQLException EventMessage_NotFound() =>
        new GraphQLException(
            ErrorBuilder.New()
                .SetMessage(ThrowHelper_EventMessage_NotFound)
                .Build());

    public static SchemaException SubscribeAttribute_MessageTypeUnspecified(
        MemberInfo member) =>
        new SchemaException(
            SchemaErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_SubscribeAttribute_MessageTypeUnspecified,
                    member.DeclaringType!.FullName,
                    member.Name)
                .SetExtension("member", member)
                .Build());

    public static SchemaException SubscribeAttribute_TopicTypeUnspecified(
        MemberInfo member) =>
        new SchemaException(
            SchemaErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_SubscribeAttribute_TopicTypeUnspecified,
                    member.DeclaringType!.FullName,
                    member.Name)
                .SetExtension("member", member)
                .Build());

    public static SchemaException SubscribeAttribute_SubscribeResolverNotFound(
        MemberInfo member,
        string subscribeResolverName) =>
        new SchemaException(
            SchemaErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_SubscribeAttribute_SubscribeResolverNotFound,
                    member.DeclaringType!.FullName,
                    member.Name,
                    subscribeResolverName)
                .SetExtension("member", member)
                .Build());

    public static SchemaException Convention_UnableToCreateConvention(
        Type convention) =>
        new SchemaException(
            SchemaErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_Convention_UnableToCreateConvention,
                    convention.FullName ?? convention.Name)
                .Build());

    public static SchemaException UsePagingAttribute_NodeTypeUnknown(
        MemberInfo member) =>
        new SchemaException(
            SchemaErrorBuilder.New()
                .SetMessage(ThrowHelper_UsePagingAttribute_NodeTypeUnknown)
                .SetCode(ErrorCodes.Paging.NodeTypeUnknown)
                .SetExtension(nameof(member), member)
                .Build());

    public static SchemaException TypeRegistrar_CreateInstanceFailed(
        Type namedSchemaType,
        Exception exception) =>
        new SchemaException(
            SchemaErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_TypeRegistrar_CreateInstanceFailed,
                    namedSchemaType.FullName)
                .SetException(exception)
                .SetExtension(nameof(namedSchemaType), namedSchemaType)
                .Build());

    public static SchemaException TypeCompletionContext_UnableToResolveType(
        ITypeSystemObject type,
        ITypeReference typeRef) =>
        new SchemaException(
            SchemaErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_TypeCompletionContext_UnableToResolveType,
                    typeRef)
                .SetTypeSystemObject(type)
                .SetExtension(nameof(typeRef), typeRef)
                .Build());

    public static SchemaException TypeInitializer_DuplicateTypeName(
        ITypeSystemObject type,
        ITypeSystemObject otherType) =>
        new SchemaException(
            SchemaErrorBuilder.New()
                .SetMessage(
                    TypeInitializer_CompleteName_Duplicate,
                    type.Name)
                .SetTypeSystemObject(type)
                .SetCode(ErrorCodes.Schema.DuplicateTypeName)
                .SetExtension(nameof(otherType), otherType)
                .Build());

    public static SchemaException TypeInitializer_MutationDuplicateErrorName(
        ITypeSystemObject type,
        string mutationName,
        string errorName,
        IReadOnlyList<ISchemaError> originalErrors)
    {
        var mutationError = SchemaErrorBuilder.New()
            .SetMessage(
                ThrowHelper_MutationDuplicateErrorName,
                mutationName,
                errorName)
            .SetTypeSystemObject(type)
            .SetCode(ErrorCodes.Schema.DuplicateMutationErrorTypeName)
            .Build();

        var errors = new List<ISchemaError>(originalErrors);
        errors.Insert(0, mutationError);

        return new SchemaException(errors);
    }

    public static SchemaException NodeAttribute_IdFieldNotFound(
        Type type,
        string idField) =>
        new SchemaException(
            SchemaErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_NodeAttribute_IdFieldNotFound,
                    idField,
                    type.FullName ?? type.Name)
                .Build());

#nullable enable
    public static SchemaException Convention_TwoConventionsRegisteredForScope(
        Type conventionType,
        IConvention first,
        IConvention other,
        string? scope) =>
        new SchemaException(
            SchemaErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_Convention_TwoConventionsRegisteredForScope,
                    conventionType.FullName ?? conventionType.Name,
                    scope ?? "default",
                    first.GetType().FullName ?? first.GetType().Name,
                    other.GetType().FullName ?? other.GetType().Name)
                .Build());

    public static SchemaException Convention_ConventionCouldNotBeCreated(
        Type conventionType,
        string? scope) =>
        new SchemaException(
            SchemaErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_Convention_ConventionCouldNotBeCreated,
                    conventionType.FullName ?? conventionType.Name,
                    scope ?? "default")
                .Build());

    public static SchemaException DataLoader_InvalidType(
        Type dataLoaderType) =>
        new SchemaException(
            SchemaErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_DataLoader_InvalidType,
                    dataLoaderType.FullName ?? dataLoaderType.Name)
                .Build());

    public static SchemaException NonGenericExecutableNotAllowed() =>
        new SchemaException(
            SchemaErrorBuilder
                .New()
                .SetMessage(ExtendedTypeReferenceHandler_NonGenericExecutableNotAllowed)
                .Build());

    public static SerializationException RequiredInputFieldIsMissing(
        InputField field,
        Path fieldPath)
        => new SerializationException(
            ErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_RequiredInputFieldIsMissing,
                    field.Name)
                .SetPath(fieldPath)
                .SetExtension("field", field.Coordinate.ToString())
                .Build(),
            field.Type,
            fieldPath);

    public static SerializationException InvalidInputFieldNames(
        InputObjectType type,
        IReadOnlyList<string> invalidFieldNames,
        Path path)
    {
        if (invalidFieldNames.Count == 1)
        {
            throw new SerializationException(
                ErrorBuilder.New()
                    .SetMessage(
                        ThrowHelper_InvalidInputFieldNames_Single,
                        invalidFieldNames[0],
                        type.Name)
                    .SetPath(path)
                    .SetExtension("type", type.Name)
                    .Build(),
                type,
                path);
        }

        throw new SerializationException(
            ErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_InvalidInputFieldNames,
                    string.Join(", ", invalidFieldNames.Select(t => $"`{t}`")),
                    type.Name)
                .SetPath(path)
                .SetExtension("type", type.Name)
                .Build(),
            type,
            path);
    }

    public static SerializationException OneOfNoFieldSet(
        InputObjectType type,
        Path? path)
    {
        var builder = ErrorBuilder.New()
            .SetMessage(ThrowHelper_OneOfNoFieldSet, type.Name)
            .SetCode(ErrorCodes.Execution.OneOfNoFieldSet)
            .SetPath(path);

        return new(builder.Build(), type, path);
    }

    public static SerializationException OneOfMoreThanOneFieldSet(
        InputObjectType type,
        Path? path)
    {
        var builder = ErrorBuilder.New()
            .SetMessage(ThrowHelper_OneOfMoreThanOneFieldSet, type.Name)
            .SetCode(ErrorCodes.Execution.OneOfMoreThanOneFieldSet)
            .SetPath(path);

        return new(builder.Build(), type, path);
    }

    public static SerializationException OneOfFieldIsNull(
        InputObjectType type,
        Path? path,
        InputField field)
    {
        var builder = ErrorBuilder.New()
            .SetMessage(ThrowHelper_OneOfFieldIsNull, field.Name, type.Name)
            .SetCode(ErrorCodes.Execution.OneOfFieldIsNull)
            .SetPath(path)
            .SetExtension(nameof(field), field.Coordinate.ToString());

        return new(builder.Build(), type, path);
    }

    public static SerializationException NonNullInputViolation(
        IType type,
        Path? path,
        InputField? field = null)
    {
        var builder = ErrorBuilder.New()
            .SetMessage(ThrowHelper_NonNullInputViolation)
            .SetCode(ErrorCodes.Execution.NonNullViolation)
            .SetPath(path);

        if (field is not null)
        {
            builder.SetExtension(nameof(field), field.Coordinate.ToString());
        }

        return new(builder.Build(), type, path);
    }

    public static SerializationException ParseInputObject_InvalidSyntaxKind(
        InputObjectType type,
        SyntaxKind kind,
        Path path)
        => new SerializationException(
            ErrorBuilder.New()
            .SetMessage(
                ThrowHelper_ParseInputObject_InvalidSyntaxKind,
                kind,
                type.Name)
            .SetPath(path)
            .SetExtension(nameof(type), type.Name)
            .Build(),
            type,
            path);

    public static SerializationException ParseInputObject_InvalidObjectKind(
        InputObjectType type,
        Type objectType,
        Path path)
        => new SerializationException(
            ErrorBuilder.New()
            .SetMessage(
                ThrowHelper_ParseInputObject_InvalidObjectKind,
                objectType.FullName ?? objectType.Name,
                type.Name,
                type.RuntimeType.FullName ?? type.RuntimeType.Name)
            .SetPath(path)
            .SetExtension(nameof(type), type.Name)
            .Build(),
            type,
            path);


    public static SerializationException ParseNestedList_InvalidSyntaxKind(
        ListType type,
        SyntaxKind kind,
        Path path)
        => new SerializationException(
            ErrorBuilder.New()
            .SetMessage(
                ThrowHelper_ParseNestedList_InvalidSyntaxKind,
                kind)
            .SetPath(path)
            .SetExtension(
                "specifiedBy",
                "https://spec.graphql.org/June2018/#sec-Type-System.List")
            .Build(),
            type,
            path);

    public static SerializationException ParseList_InvalidObjectKind(
        ListType type,
        Type listType,
        Path path)
        => new SerializationException(
            ErrorBuilder.New()
            .SetMessage(
                ThrowHelper_ParseList_InvalidObjectKind,
                listType.FullName ?? listType.Name,
                type.Print(),
                type.RuntimeType.FullName ?? type.RuntimeType.Name)
            .Build(),
            type,
            path);

    public static SerializationException FormatValueList_InvalidObjectKind(
        ListType type,
        Type listType,
        Path path)
        => new SerializationException(
            ErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_FormatValueList_InvalidObjectKind,
                    type.Print(),
                    listType.FullName ?? listType.Name)
                .SetPath(path)
                .Build(),
            type,
            path);

    public static SerializationException FormatResultObject_InvalidObjectKind(
        InputObjectType type,
        Type objectType,
        Path path)
        => new SerializationException(
            ErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_FormatResultObject_InvalidObjectKind,
                    objectType.FullName ?? objectType.Name,
                    type.Name,
                    type.RuntimeType.FullName ?? type.RuntimeType.Name)
                .SetPath(path)
                .SetExtension(nameof(type), type.Name)
                .Build(),
            type,
            path);

    public static SerializationException FormatResultList_InvalidObjectKind(
        ListType type,
        Type listType,
        Path path)
        => new SerializationException(
            ErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_FormatResultList_InvalidObjectKind,
                    type.Print(),
                    listType.FullName ?? listType.Name)
                .SetPath(path)
                .Build(),
            type,
            path);

    public static SerializationException FormatResultLeaf_InvalidSyntaxKind(
        IType type,
        SyntaxKind kind,
        Path path)
        => new SerializationException(
            ErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_FormatResultLeaf_InvalidSyntaxKind,
                    type.Print(),
                    kind)
                .SetPath(path)
                .Build(),
            type,
            path);

    public static InvalidOperationException RewriteNullability_InvalidNullabilityStructure()
        => new(AbstractionResources.ThrowHelper_TryRewriteNullability_InvalidNullabilityStructure);

    public static InvalidSchemaCoordinateException Schema_GetMember_DirectiveArgumentNotFound(
        SchemaCoordinate coordinate)
        => new InvalidSchemaCoordinateException(
            string.Format(
                CultureInfo.InvariantCulture,
                ThrowHelper_Schema_GetMember_DirectiveArgumentNotFound,
                coordinate.ArgumentName!,
                coordinate.Name),
            coordinate);

    public static InvalidSchemaCoordinateException Schema_GetMember_DirectiveNotFound(
        SchemaCoordinate coordinate)
        => new InvalidSchemaCoordinateException(
            string.Format(
                CultureInfo.InvariantCulture,
                ThrowHelper_Schema_GetMember_DirectiveNotFound,
                coordinate.Name),
            coordinate);

    public static InvalidSchemaCoordinateException Schema_GetMember_EnumValueNotFound(
        SchemaCoordinate coordinate)
        => new InvalidSchemaCoordinateException(
            string.Format(
                CultureInfo.InvariantCulture,
                ThrowHelper_Schema_GetMember_EnumValueNotFound,
                coordinate.MemberName!,
                coordinate.Name),
            coordinate);

    public static InvalidSchemaCoordinateException Schema_GetMember_InputFieldNotFound(
        SchemaCoordinate coordinate)
        => new InvalidSchemaCoordinateException(
            string.Format(
                CultureInfo.InvariantCulture,
                ThrowHelper_Schema_GetMember_InputFieldNotFound,
                coordinate.MemberName!,
                coordinate.Name),
            coordinate);

    public static InvalidSchemaCoordinateException Schema_GetMember_InvalidCoordinate(
        SchemaCoordinate coordinate,
        INamedType type)
        => new InvalidSchemaCoordinateException(
            string.Format(
                CultureInfo.InvariantCulture,
                ThrowHelper_Schema_GetMember_InvalidCoordinate,
                coordinate.ToString(),
                type.Name),
            coordinate);

    public static InvalidSchemaCoordinateException Schema_GetMember_FieldArgNotFound(
        SchemaCoordinate coordinate)
        => new InvalidSchemaCoordinateException(
            string.Format(
                CultureInfo.InvariantCulture,
                ThrowHelper_Schema_GetMember_FieldArgNotFound,
                coordinate.ArgumentName!,
                coordinate.Name,
                coordinate.MemberName!),
            coordinate);

    public static InvalidSchemaCoordinateException Schema_GetMember_FieldNotFound(
        SchemaCoordinate coordinate)
        => new InvalidSchemaCoordinateException(
            string.Format(
                CultureInfo.InvariantCulture,
                ThrowHelper_Schema_GetMember_FieldNotFound,
                coordinate.MemberName!,
                coordinate.Name),
            coordinate);

    public static InvalidSchemaCoordinateException Schema_GetMember_TypeNotFound(
        SchemaCoordinate coordinate)
        => new InvalidSchemaCoordinateException(
            string.Format(
                CultureInfo.InvariantCulture,
                ThrowHelper_Schema_GetMember_TypeNotFound,
                coordinate.Name),
            coordinate);

    public static InvalidOperationException FieldBase_Sealed()
        => new(ThrowHelper_FieldBase_Sealed);

    public static InvalidOperationException NodeResolver_ArgumentTypeMissing()
        => new(ThrowHelper_NodeResolver_ArgumentTypeMissing);

    public static InvalidOperationException NodeResolver_ObjNoDefinition()
        => new(ThrowHelper_NodeResolver_ObjNoDefinition);

    public static SchemaException RelayIdFieldHelpers_NoFieldType(
        string fieldName,
        ITypeSystemObject? type = null)
    {
        var builder =SchemaErrorBuilder.New();
        builder.SetMessage(ThrowHelper_RelayIdFieldHelpers_NoFieldType, fieldName);

        if (type is not null)
        {
            builder.SetTypeSystemObject(type);
        }

        return new SchemaException(builder.Build());
    }

    public static GraphQLException MissingIfArgument(
        DirectiveNode directive)
        => new(
            ErrorBuilder.New()
                .SetMessage(
                    ThrowHelper_MissingDirectiveIfArgument,
                    directive.Name.Value)
                .AddLocation(directive)
                .Build());
}
