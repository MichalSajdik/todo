import React, { useState } from 'react';

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
    <div>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default AddTodoForm;
