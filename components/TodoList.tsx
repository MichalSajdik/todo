import React, { useState } from 'react';
import { Todo, TODO_STATUS } from '@/types/Todo';
import { SelectChangeEvent, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { options } from '@/pages/lib/helpers';

interface TodoListProps {
    todos: Todo[];
    onEditTodo: (id: string, description: string, status: TODO_STATUS) => void;
    onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onEditTodo, onDeleteTodo }) => {
  const [ editTodoId, setEditTodoId ] = useState<string>('');
  const [ editedDescription, setEditedDescription ] = useState<string>('');
  const [ editedStatus, setEditedStatus ] = useState<TODO_STATUS>(TODO_STATUS.TODO);

  const handleEditStart = (id: string, description: string, status: TODO_STATUS) => {
    setEditTodoId(id);
    setEditedDescription(description);
    setEditedStatus(status);
  };

  const handleEditCancel = () => {
    setEditTodoId('');
    setEditedDescription('');
  };

  const handleEditSave = (id: string) => {
    onEditTodo(id, editedDescription, editedStatus);
    setEditTodoId('');
    setEditedDescription('');
  };

  const sortedTodos = todos.sort(sortBasedOnTime);

  return (
    <div data-testid="todo-list">
      {sortedTodos.map((todo) => {
        const isEdited = todo.id === editTodoId;
        const date = Intl.DateTimeFormat('cs-CZ', options).format(new Date(todo.lastModifiedAt));

        return (
          <div key={todo.id}>
            <>
              <TextField id="outlined-basic" variant="outlined"
                style={{ display: 'inline-block', width: '100px' }} value={todo.id}
                disabled={true}/>

              <TextField id="outlined-basic" variant="outlined"
                inputProps={{ 'data-testid': `description-${todo.id}` }}
                style={{ display: 'inline-block', width: '400px' }}
                fullWidth
                value={isEdited ? editedDescription : todo.description}
                disabled={!isEdited}
                onChange={(e) => {
                  setEditedDescription(e.target.value);
                }}/>

              <Select
                id="select"
                inputProps={{ 'data-testid': `select-${todo.id}` }}
                style={{ width: '160px' }}
                value={isEdited ? editedStatus : todo.status}
                disabled={!isEdited}
                onChange={(e: SelectChangeEvent<TODO_STATUS>) => {
                  setEditedStatus(e.target.value as TODO_STATUS);
                }}
              >
                <MenuItem value={TODO_STATUS.TODO}>Todo</MenuItem>
                <MenuItem value={TODO_STATUS.IN_PROGRESS}>Active</MenuItem>
                <MenuItem value={TODO_STATUS.COMPLETED}>Done</MenuItem>
              </Select>

              <TextField id="outlined-basic" variant="outlined"
                style={{ width: '180px', display: 'inline-block' }}
                value={date}
                disabled={true}/>

              {!isEdited && <>
                <IconButton aria-label="edit" data-testid={`edit-${todo.id}`}
                  style={{ display: 'inline-block', height: '56px', width: '56px' }}
                  onClick={() => handleEditStart(todo.id, todo.description, todo.status)}>
                  <ModeEditIcon/>
                </IconButton>
                <IconButton aria-label="delete" data-testid={`delete-${todo.id}`}
                  style={{ display: 'inline-block', height: '56px', width: '56px' }}
                  onClick={() => onDeleteTodo(todo.id)}>
                  <DeleteIcon/>
                </IconButton>

              </>}

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
              </>}
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