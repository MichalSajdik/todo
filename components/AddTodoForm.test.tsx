import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodoForm from '@/components/AddTodoForm';

describe('AddTodoForm', () => {
  it('calls onAddTodo when Add TODO button is clicked with a non-empty description', () => {
    const onAddTodoMock = jest.fn();
    const { getByLabelText, getByText } = render(<AddTodoForm onAddTodo={onAddTodoMock}/>);
    const descriptionInput = getByLabelText('Todo description');
    const addButton = getByText('Add TODO');

    fireEvent.change(descriptionInput, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    expect(onAddTodoMock).toHaveBeenCalledWith('Test Todo');
  });

  it('does not call onAddTodo when Add TODO button is clicked with an empty description', () => {
    const onAddTodoMock = jest.fn();
    const { getByLabelText, getByText } = render(<AddTodoForm onAddTodo={onAddTodoMock}/>);
    const descriptionInput = getByLabelText('Todo description');
    const addButton = getByText('Add TODO');

    fireEvent.change(descriptionInput, { target: { value: '' } });
    fireEvent.click(addButton);

    expect(onAddTodoMock).not.toHaveBeenCalled();
  });
});
