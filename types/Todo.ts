export interface Todo {
    id: string;
    description: string;
    createdAt: Date;
    lastModifiedAt: Date;
    status: TodoStatus;
}

export interface TodosResponse {
    data: Todo[];
    error: string;
}

export interface TodoResponse {
    data: Todo | null;
    error: string;
}

export enum TodoStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}
