require("dotenv").config();
const db = require("./models");
db.sequelize.sync({ force: false });

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const GraphQL = require('graphql');
const {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLSchema} = GraphQL;

const studentType = require('./types/studentType')(GraphQL);
const StudentService = require('./services/StudentService');
const studentService = new StudentService(db);

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getStudent: {
            type: studentType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}}
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery
});

// The root provides a resolver function for each API endpoint
const root = {
    getStudent: async ({id}) => await studentService.get(id),
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(process.env.PORT);
console.log("Running a GraphQL API server at http://localhost:3000/graphql");
