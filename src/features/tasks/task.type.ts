export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    checked: boolean;
}

export interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: any;
}