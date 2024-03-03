import { act, renderHook } from '@testing-library/react';
import { useTodos } from '@/hooks/useTodos';
import { Todo } from '@/types/Todo';
import api from '@/pages/lib/api';

jest.mock('@/pages/lib/api');

describe('useTodos', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches todos successfully', async () => {
    const mockTodos = [
      { id: '1', description: 'Todo 1' },
      { id: '2', description: 'Todo 2' },
    ];
    (api.get as jest.Mock).mockResolvedValue({ data: { data: mockTodos, error: '' } });

    const { result } = renderHook(() => useTodos());

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.todos).toEqual(mockTodos);
    expect(result.current.error).toBe('');
  });

  it('handles fetch error', async () => {
    const errorMessage = 'Error fetching todos';
    (api.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useTodos());

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.todos).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  it('handles addTodo successfully', async () => {
    const mockTodos: Todo[] = [];
    (api.get as jest.Mock).mockResolvedValue({ data: { data: mockTodos, error: '' } });

    const mockTodo = { data: { id: '3', description: 'New Todo' } };
    (api.post as jest.Mock).mockResolvedValue({ data: mockTodo });

    const { result } = renderHook(() => useTodos());

    await act(async () => {
      await result.current.handleAddTodo('New Todo');

      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.todos).toEqual([ mockTodo.data ]);
    expect(result.current.error).toBe('');
  });

  it('handles addTodo error', async () => {
    const errorMessage = 'Error adding todo';
    (api.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useTodos());

    await act(async () => {
      await result.current.handleAddTodo('New Todo');
    });

    expect(result.current.error).toBe(errorMessage);
  });

  it('handles editTodo successfully', async () => {
    const mockTodos = [
      { id: '1', description: 'Todo 1' },
    ];
    (api.get as jest.Mock).mockResolvedValue({ data: { data: mockTodos, error: '' } });

    const mockTodoId = '1';
    const mockTodo = { id: mockTodoId, description: 'Todo 1' };
    (api.patch as jest.Mock).mockResolvedValue({ description: 'Updated Todo' });

    const { result } = renderHook(() => useTodos());

    await act(async () => {
      await result.current.editTodo(mockTodoId, 'Updated Todo');
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Expect the fetchTodos function to be called after editing
    expect(result.current.todos).toEqual([ mockTodo ]);
    expect(result.current.error).toBe('');
  });

  it('handles deleteTodo successfully', async () => {
    const mockTodos = [ { id: '1', description: 'Todo 1' } ];
    (api.get as jest.Mock).mockResolvedValue({ data: { data: mockTodos, error: '' } });

    const { result } = renderHook(() => useTodos());

    await act(async () => {
      await result.current.deleteTodo('1');

      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.todos).toEqual([]);
    expect(result.current.error).toBe('');
  });
});
