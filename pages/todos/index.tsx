import React from 'react';
import TodoList from '../../components/TodoList';
import AddTodoForm from '../../components/AddTodoForm';
import { useTodos } from '@/hooks/useTodos';

const TodosPage = () => {

  const { todos, handleAddTodo, editTodo, deleteTodo } = useTodos();
  return (

    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <AddTodoForm onAddTodo={handleAddTodo}/>
        <TodoList todos={todos} onEditTodo={editTodo} onDeleteTodo={deleteTodo}/>
      </div>
    </div>
  );
};

export default TodosPage;