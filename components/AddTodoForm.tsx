import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

interface AddTodoFormProps {
    onAddTodo: (description: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [ description, setDescription ] = useState('');

  const handleAddTodo = () => {
    if (description.trim()) {
      onAddTodo(description);
      setDescription('');
    }
  };

  return (
    <div data-testid="add-todo-form">
      <Button variant="outlined" onClick={handleAddTodo} style={{ height: '56px', width: '200px', float: 'left' }}>Add
                TODO</Button>
      <TextField id="outlined-basic" label="Todo description" variant="outlined"
        onChange={(e) => setDescription(e.target.value)}
        value={description} style={{ height: '56px', width: '600px' }}/>
    </div>
  );
};

export default AddTodoForm;
