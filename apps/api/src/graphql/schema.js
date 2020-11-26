const { buildSchema } = require('graphql');

module.exports = buildSchema(`
   type Todos {
     id: String!
     title: String!
     description: String!
     endGoal: String
     actions: String
   }
   input AddTodoData {
     title: String!
     description: String!
     endGoal: String
     actions: String
   }
   type RootQuery {
     todos: [Todos]
   }
   type RootMutation {
      addTodo(addTodo: AddTodoData): Todos
   }
   schema {
      query: RootQuery,
      mutation: RootMutation
   }
`);
