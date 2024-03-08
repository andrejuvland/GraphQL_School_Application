require("dotenv").config();
const db = require("./models");
db.sequelize.sync({ force: false });

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const GraphQL = require('graphql');
const {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList} = GraphQL;

const studentType = require('./types/studentType')(GraphQL);
const schoolType = require('./types/schoolType')(GraphQL);
const StudentService = require('./services/StudentService');
const SchoolService = require("./services/SchoolService");
const studentService = new StudentService(db);
const schoolService = new SchoolService(db);

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getStudent: {
            type: studentType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}}
        }
    },
    getStudents: {
        type: GraphQLList(studentType)
    },
    getSchool: {
        type: schoolType,
        args: {id: {type: new GraphQLNonNull(GraphQLID)}}
    },
    getSchools: {
        type: GraphQLList(schoolType)
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createStudent: {
            type: studentType,
            args: {
                FirstName: {type: GraphQLString},
                LastName: {type: GraphQLString},
                SchoolId: {type: GraphQLID}
            }
        },
        createSchool: {
            type: schoolType,
            args: {
                Name: {type: GraphQLString},
                Address: {type: GraphQLString},
                Description: {type: GraphQLString}
            }
        },
        deleteStudent: {
            type: studentType,
            args: {
                id: {type: GraphQLID}
            }
        },
        deleteSchool: {
            type: schoolType,
            args: {
                id: {type: GraphQLID}
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

// The root provides a resolver function for each API endpoint
const root = {
    getStudent: async ({id}) => await studentService.get(id),
    getStudents: async () => await studentService.getAll(),
    createStudent: async ({FirstName, LastName, SchoolId}) => await studentService(FirstName, LastName, SchoolId),
    deleteStudent: async ({id}) => await studentService.delete(id),
    getSchool: async ({id}) => await schoolService.get(id),
    getSchools: async () => await schoolService.getAll(),
    createSchool: async ({Name, Address, Description}) => await schoolService.create(Name, Address, Description),
    deleteSchool: async ({id}) => await schoolService.delete(id),
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
