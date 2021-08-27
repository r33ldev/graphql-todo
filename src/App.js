import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_TODOS = gql`
  query getTodos {
    todos {
      title
      done
      id
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodo {
    __typename
    insert_todos(objects: { title: "New todo" }) {
      returning {
        title
        done
        id
      }
    }
  }
`;

function App() {
  const [newTodo, setNewTodo] = React.useState('');
  function handleNewTodoSubmit(e) {
    e.preventDefault();
  }
  const { data, loading, error } = useQuery(GET_TODOS);
  if (loading) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error fetching todo ....</p>
      </div>
    );
  }
  return (
    <>
      <h1>Graphql todo list</h1>

      <form onSubmit={handleNewTodoSubmit}>
        <input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Enter new todo"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Enter</button>
      </form>

      <div>
        {data.todos.map((todo) => {
          return (
            <p key={todo.id}>
              {todo.title}
              <button>&times;</button>
            </p>
          );
        })}
      </div>
    </>
  );
}

export default App;
