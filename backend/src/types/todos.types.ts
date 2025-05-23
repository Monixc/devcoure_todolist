export interface BaseTodo {
    id: number;
    title: string;  
    isCompleted: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
}

export interface PersonalTodo extends BaseTodo {
    fk_user_id: number;
}

export interface TeamTodo extends BaseTodo {
    fk_team_id: number;
}

export interface CreateTodoDto {
    title: string;
}

export interface UpdateTodoDto {
    title: string;
}
