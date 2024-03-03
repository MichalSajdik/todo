import { useEffect, useState } from 'react';
import { Todo } from '@/types/Todo';
import api from '@/pages/lib/api';
import { ROUTES } from '@/pages/lib/helpers';

export const useTodos = () => {
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string>('');

  const fetchTodos = async () => {
    try {
      const { data: response } = await api.get(ROUTES.TODOS);
      setTodos(response.data);
      setError(response.error);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Error fetching todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (description: string) => {
    try {
      const { data: response } = await api.post(ROUTES.TODOS, { description });

      if (!response.data) {
        console.error('Failed to add todo - response data is incorrect: ', response.data);
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

  const editTodo = async (id: string, description: string) => {
    try {
      await api.patch(`${ROUTES.TODOS}?id=${id}`, { description });
      fetchTodos();

    } catch (error) {
      console.error('Error editing todo:', error);
      setError('Error editing todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await api.delete(`${ROUTES.TODOS}?id=${id}`);

      setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
      setError('');

    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Error deleting todo');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, error, handleAddTodo: addTodo, editTodo, deleteTodo };
};