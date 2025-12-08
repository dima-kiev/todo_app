export type Category = 'All' | 'Work' | 'Personal' | 'Shopping' | 'Health';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
    category?: Category;
}
