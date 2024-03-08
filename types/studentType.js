module.exports = (graphql) => {
    return new graphql.GraphQLObjectType({
        name: 'Student',
        fields: {
            id: {
                type: new graphql.GraphQLNonNull(graphql.GraphQLID),
            },
            SchoolId: {
                type: new graphql.GraphQLID,
            },
            FirstName: {
                type: graphql.GraphQLString,
            },
            LastName: {
                type: graphql.GraphQLString,
            }
        }
    });
}