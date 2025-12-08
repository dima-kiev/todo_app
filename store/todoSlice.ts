import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, Category } from '../types';

const initialState: Todo[] = [];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<{ text: string; category: Category }>) => {
            state.push({
                id: Date.now().toString(),
                text: action.payload.text,
                completed: false,
                createdAt: Date.now(),
                category: action.payload.category,
            });
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            return state.filter((todo) => todo.id !== action.payload);
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.find((t) => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        editTodo: (state, action: PayloadAction<{ id: string; text: string; category: Category }>) => {
            const todo = state.find((t) => t.id === action.payload.id);
            if (todo) {
                todo.text = action.payload.text;
                todo.category = action.payload.category;
            }
        },
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            return action.payload;
        }
    },
});

export const { addTodo, removeTodo, toggleTodo, editTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
