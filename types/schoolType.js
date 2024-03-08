module.exports = (graphql) => {
    return new graphql.GraphQLObjectType({
        name: 'School',
        fields: {
            id: {
                type: new graphql.GraphQLNonNull(graphql.GraphQLID),
            },
            Name: {
                type: graphql.GraphQLString,
            },
            Address: {
                type: graphql.GraphQLString,
            },
            Description: {
                type: graphql.GraphQLString,
            }
        }
    });
}