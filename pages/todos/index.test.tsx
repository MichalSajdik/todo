import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodosPage from './index';
import { useTodos } from '@/hooks/useTodos';

jest.mock('@/hooks/useTodos');

describe('TodosPage', () => {
  test('renders loading state', () => {
    (useTodos as jest.Mock).mockReturnValue({ todos: [], loading: true, error: '' });

    render(<TodosPage/>);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    (useTodos as jest.Mock).mockReturnValue({ todos: [], loading: false, error: 'Some error' });

    render(<TodosPage/>);

    expect(screen.getByText('Error: Some error')).toBeInTheDocument();
  });

  test('renders TodosPage with todos', async () => {
    const mockTodos = [
      { id: '1', description: 'Todo 1', lastModifiedAt: new Date() },
      { id: '2', description: 'Todo 2', lastModifiedAt: new Date() },
    ];
    (useTodos as jest.Mock).mockReturnValue({ todos: mockTodos, loading: false, error: '' });

    render(<TodosPage/>);

    expect(screen.getByTestId('add-todo-form')).toBeInTheDocument();
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();

  });

});
