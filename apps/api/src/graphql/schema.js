const { buildSchema } = require('graphql');

module.exports = buildSchema(`
   type Todos {
     id: String!
     title: String!
     author: String!
   }
   input AddTodoData {
     title: String!
     author: String!
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
