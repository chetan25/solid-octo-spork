import { GraphQLClient, gql } from 'graphql-request';

const endpoint = "http://localhost:3333/graphql";

// create a GraphQL client instance to send requests
const client = new GraphQLClient(endpoint, { headers: {} });

export const getTodo = () => {
  const getQuery = gql`
       {
          todos {
              id
          }
       }
  `;
  return client.request(getQuery);
};

export const addTodo = (todo) => {
  const addTodo = gql`
    mutation RootMutation($title: String!, $author: String!) {
      addTodo(addTodo: {title: $title, author: $author}) {
         id
      }
    }
  `;

  console.log('fired');
  return client.request(addTodo, {
    title: todo.title,
    author: todo.author
  });
};


