import { useEffect, useState } from 'react';
import { Todo } from '@/types/Todo';
import axios from 'axios';

export const useTodos = () => {
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string>('');

  const fetchTodos = async () => {
    try {
      const { data: response } = await axios.get('/api/todos');
      setTodos(response.data);
      setError(response.error);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Error fetching todos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (description: string) => {
    try {
      const { data: response } = await axios.post('/api/todos', { description });

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
      await axios.patch(`/api/todos?id=${id}`, { description });
      fetchTodos();

    } catch (error) {
      console.error('Error editing todo:', error);
      setError('Error editing todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`/api/todos?id=${id}`);

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

  return { todos, loading, error, handleAddTodo, editTodo, deleteTodo };
};