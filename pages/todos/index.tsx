import React from 'react';
import TodoList from '../../components/TodoList';
import AddTodoForm from '../../components/AddTodoForm';
import { useTodos } from '@/hooks/useTodos';

const TodosPage = () => {

  const { todos, handleAddTodo } = useTodos();
  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos}/>
      <AddTodoForm onAddTodo={handleAddTodo}/>
    </div>
  );
};

export default TodosPage;