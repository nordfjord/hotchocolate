﻿using HotChocolate.Data.Neo4J.Testing;

namespace HotChocolate.Data.Neo4J.Paging.Tests;

[CollectionDefinition(DefinitionName)]
public class Neo4JDatabaseCollectionFixture : ICollectionFixture<Neo4JDatabase>
{
    internal const string DefinitionName = "Neo4JDatabase";
}
