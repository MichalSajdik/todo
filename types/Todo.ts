export interface Todo {
    id: string;
    description: string;
    createdAt: Date;
    lastModifiedAt: Date;
    status: TODO_STATUS;
}

export interface TodosResponse {
    data: Todo[];
    error: string;
}

export interface TodoResponse {
    data: Todo | null;
    error: string;
}

export enum TODO_STATUS {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}
