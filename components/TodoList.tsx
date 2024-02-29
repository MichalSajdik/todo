import React, { useState } from 'react';
import { Todo } from '@/types/Todo';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { options } from '@/pages/lib/helpers';

interface TodoListProps {
    todos: Todo[];
    onEditTodo: (id: string, newDescription: string) => void;
    onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onEditTodo, onDeleteTodo }) => {
  const [ editTodoId, setEditTodoId ] = useState<string>('');
  const [ editedDescription, setEditedDescription ] = useState<string>('');

  const handleEditStart = (id: string, description: string) => {
    setEditTodoId(id);
    setEditedDescription(description);
  };

  const handleEditCancel = () => {
    setEditTodoId('');
    setEditedDescription('');
  };

  const handleEditSave = (id: string) => {
    onEditTodo(id, editedDescription);
    setEditTodoId('');
    setEditedDescription('');
  };

  const sortedTodos = todos.sort(sortBasedOnTime);

  return (
    <div>
      {sortedTodos.map((todo) => {
        const isEdited = todo.id === editTodoId;
        const date = Intl.DateTimeFormat('cs-CZ', options).format(new Date(todo.lastModifiedAt));

        return (

          <div key={todo.id}>
            <>
              <TextField id="outlined-basic" variant="outlined"
                style={{ display: 'inline-block', width: '100px' }} value={todo.id}
                disabled={true}/>
              <TextField id="outlined-basic" variant="outlined" data-testid={`description2-${todo.id}`}
                inputProps={{ 'data-testid': `description-${todo.id}` }}
                style={{ display: 'inline-block', width: '400px' }}
                fullWidth
                value={isEdited ? editedDescription : todo.description}
                disabled={!isEdited}
                onChange={(e) => {
                  setEditedDescription(e.target.value);
                }}/>
              <TextField id="outlined-basic" variant="outlined"
                style={{ width: '200px', display: 'inline-block' }}
                value={date}
                disabled={true}/>

              {!isEdited && <>
                <IconButton aria-label="edit" data-testid={`edit-${todo.id}`}
                  style={{ display: 'inline-block', height: '56px', width: '56px' }}
                  onClick={() => handleEditStart(todo.id, todo.description)}>
                  <ModeEditIcon/>
                </IconButton>
                <IconButton aria-label="delete" data-testid={`delete-${todo.id}`}
                  style={{ display: 'inline-block', height: '56px', width: '56px' }}
                  onClick={() => onDeleteTodo(todo.id)}>
                  <DeleteIcon/>
                </IconButton>

              </>
              }
              {isEdited && <>
                <IconButton aria-label="save" data-testid={`save-${todo.id}`}
                  style={{ display: 'inline-block', height: '56px', width: '56px' }}
                  onClick={() => handleEditSave(todo.id)}>
                  <SaveIcon/>
                </IconButton>
                <IconButton aria-label="cancel" data-testid={`cancel-${todo.id}`}
                  style={{ display: 'inline-block', height: '56px', width: '56px' }}
                  onClick={handleEditCancel}>
                  <CancelIcon/>
                </IconButton>
              </>
              }

            </>
          </div>
        );

      }
      )}
    </div>
  );
};

const sortBasedOnTime = (a: Todo, b: Todo) => {
  return new Date(b.lastModifiedAt).getTime() - new Date(a.lastModifiedAt).getTime();
};

export default TodoList;