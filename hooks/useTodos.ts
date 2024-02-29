import { useEffect, useState } from 'react';
import { Todo, TodosResponse } from '@/types/Todo';
import axios from 'axios';

export const useTodos = () => {
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string>('');

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      const todosResponse: TodosResponse = await response.json();
      setTodos(todosResponse.data);
      setError(todosResponse.error);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Error fetching todos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (description: string) => {
    try {
      const response = await axios.post('/api/todos', { description });

      if (response.data === null) {
        console.error('Failed to add todo - response data is null');
        setError('Failed to add todo');
        return;
      }

      setTodos((prevTodos) => [ ...prevTodos, response.data as Todo ]);
      setError('');

    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Error adding todo');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, error, handleAddTodo };
};