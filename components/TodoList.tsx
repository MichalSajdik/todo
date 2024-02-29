import React, { useState } from 'react';
import { Todo } from '@/types/Todo';

interface TodoListProps {
    todos: Todo[];
    onEditTodo: (id: string, newDescription: string) => void;
    onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onEditTodo, onDeleteTodo }) => {
  const [ editTodoId, setEditTodoId ] = useState<string>('');
  const [ editedDescription, setEditedDescription ] = useState<string>('');

  const handleEditStart = (id: string, description: string) => {
    setEditTodoId(id);
    setEditedDescription(description);
  };

  const handleEditCancel = () => {
    setEditTodoId('');
    setEditedDescription('');
  };

  const handleEditSave = (id: string) => {
    onEditTodo(id, editedDescription);
    setEditTodoId('');
    setEditedDescription('');
  };

  const sortedTodos = todos.sort(sortBasedOnTime);
  
  return (
    <ul className="space-y-2">
      {sortedTodos.map((todo) => (
        <li key={todo.id} className={`p-4 border rounded-md ${editTodoId === todo.id ? 'bg-gray-100' : ''}`}>
          {editTodoId === todo.id ? (
            <>
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border p-1 w-full"
              />
              <button
                onClick={() => handleEditSave(todo.id)}
                className="bg-green-500 text-white px-2 py-1 ml-2 rounded"
              >
                                Save
              </button>
              <button
                onClick={handleEditCancel}
                className="bg-gray-500 text-white px-2 py-1 ml-2 rounded"
              >
                                Cancel
              </button>
            </>
          ) : (
            <>
              <span className="mr-2">{todo.description}</span>
              <button
                onClick={() => handleEditStart(todo.id, todo.description)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                                Edit
              </button>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
              >
                                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

const sortBasedOnTime = (a: Todo, b: Todo) => {
  return new Date(b.lastModifiedAt).getTime() - new Date(a.lastModifiedAt).getTime();
};

export default TodoList;