import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '@/components/TodoList';
import { Todo, TODO_STATUS } from '@/types/Todo';

describe('TodoList', () => {
  const todos: Todo[] = [
    {
      id: '1',
      description: 'Todo 1',
      lastModifiedAt: new Date(),
      status: TODO_STATUS.TODO,
      createdAt: new Date(),
      user_id: '1',
    },
    {
      id: '2',
      description: 'Todo 2',
      lastModifiedAt: new Date(),
      status: TODO_STATUS.TODO,
      createdAt: new Date(),
      user_id: '1',
    },
  ];

  const onEditTodoMock = jest.fn();
  const onDeleteTodoMock = jest.fn();

  it('renders todos with edit and delete buttons', () => {
    const { getAllByLabelText } = render(
      <TodoList todos={todos} onEditTodo={onEditTodoMock} onDeleteTodo={onDeleteTodoMock}/>
    );

    const editButtons = getAllByLabelText('edit');
    const deleteButtons = getAllByLabelText('delete');

    expect(editButtons).toHaveLength(todos.length);
    expect(deleteButtons).toHaveLength(todos.length);
  });

  it('edits description', async () => {
    const { getByTestId } = render(
      <TodoList todos={todos} onEditTodo={onEditTodoMock} onDeleteTodo={onDeleteTodoMock}/>
    );

    fireEvent.click(getByTestId('edit-1'));
    fireEvent.click(getByTestId('cancel-1'));
    fireEvent.click(getByTestId('edit-1'));
    const descriptionTextField = getByTestId('description-1');
    fireEvent.change(descriptionTextField, { target: { value: 'Updated Task 1' } });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.click(getByTestId('save-1'));

    expect(descriptionTextField).toHaveValue('Todo 1');
    expect(onEditTodoMock).toHaveBeenCalledTimes(1);
    expect(onEditTodoMock).toHaveBeenCalledWith('1', 'Updated Task 1', TODO_STATUS.TODO);
  });

  it('calls onDeleteTodo when delete button is clicked', () => {
    const { getByTestId } = render(
      <TodoList todos={todos} onEditTodo={onEditTodoMock} onDeleteTodo={onDeleteTodoMock}/>
    );

    fireEvent.click(getByTestId('delete-1'));

    expect(onDeleteTodoMock).toHaveBeenCalledTimes(1);
  });
});
