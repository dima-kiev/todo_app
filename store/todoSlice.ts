import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types';

const initialState: Todo[] = [];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.push({
                id: Date.now().toString(),
                text: action.payload,
                completed: false,
                createdAt: Date.now(),
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
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            return action.payload;
        }
    },
});

export const { addTodo, removeTodo, toggleTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
