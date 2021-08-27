import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_TODOS = gql`
  query getTodos {
    todos(order_by: { created_at: desc }) {
      title
      done
      id
    }
  }
`;

const TOGGLE_DONE = gql`
  mutation toggleDone($id: uuid!, $done: Boolean!) {
    update_todos(where: { id: { _eq: $id } }, _set: { done: $done }) {
      returning {
        title
        done
        id
      }
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodo($title: String!) {
    insert_todos(objects: { title: $title }) {
      returning {
        title
        done
        id
      }
    }
  }
`;

const DEL_TODO = gql`
  mutation delTodo($id: uuid!) {
    delete_todos(where: { id: { _eq: $id } }) {
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

  const { data, loading, error } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_DONE);
  const [delTodo] = useMutation(DEL_TODO, {
    onCompleted: () => {
      alert('Todo deleted successfully');
    },
  });
  const [addTodo] = useMutation(ADD_TODO, {
    onCompleted: () => {
      setNewTodo('');
      alert('Todo added successfully');
    },
  });

  async function handleDoneToggle({ id, done }) {
    const data = await toggleTodo({
      variables: { id, done: !done },
    });
    console.log(data);
  }

  async function handleDeleteTodo({ id }) {
    const confirmDel = window.confirm('Are you sure you want to delete');
    if (confirmDel) {
      const data = await delTodo({
        variables: { id },
        update: (cache) => {
          const prevData = cache.readQuery({ query: GET_TODOS });
          const newTodo = prevData.todos.filter((todo) => todo.id !== id);
          cache.writeQuery({
            query: GET_TODOS,
            data: { todos: newTodo },
            merge: true,
          });
        },
      });
      console.log(data);
    }
  }

  async function handleNewTodoSubmit(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const data = await addTodo({
      variables: { title: newTodo },
      refetchQueries: [{ query: GET_TODOS }],
    });
    console.log(data);
  }

  if (loading) {
    return <p className="purple">Loading....</p>;
  }
  if (error) {
    return <p>Error fetching todo ....</p>;
  }
  return (
    <div className="code vh-100 flex flex-column items-center bg-purple pa3 fl-1 white">
      <h1>
        Graphql Checklist{' '}
        <span role="img" arial-label="Checkmarks">
          {' '}
          ✅
        </span>
      </h1>

      <form onSubmit={handleNewTodoSubmit} className="mb3">
        <input
          className="pa2 f4 b--dashed"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter new todo"
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
        />
        <button className="pa2 f4 bg-green pointer" type="submit">
          Enter
        </button>
      </form>

      <div className="flex items-center  flex-column todo-content">
        {data.todos.map((todo) => {
          return (
            <p
              key={todo.id}
              onDoubleClick={() => handleDoneToggle(todo)}
              className={`pa3 dim f4 pointer ${todo.done && 'strike'}`}
            >
              {todo.title}
              <button
                className="pointer bg-transparent bn f4 pl3"
                onClick={() => handleDeleteTodo(todo)}
              >
                {' '}
                <span className="red">&times;</span>
              </button>
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default App;
