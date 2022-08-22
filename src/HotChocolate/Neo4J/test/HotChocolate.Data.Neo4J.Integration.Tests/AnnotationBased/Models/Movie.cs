namespace HotChocolate.Data.Neo4J.Integration.Tests.AnnotationBased.Models;

[Neo4JNode("Movie")]
public class Movie
{
    public string Title { get; set; }

    [Neo4JRelationship("ACTED_IN", RelationshipDirection.Incoming)]
    public List<Actor> Genres { get; set; }
}
