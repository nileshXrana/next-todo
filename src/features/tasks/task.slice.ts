import { createSlice } from '@reduxjs/toolkit';
import { getTasksThunk, addTaskThunk, updateTaskThunk, deleteTaskThunk } from '../thunk';
import { TasksState } from './task.type';

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    } as TasksState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasksThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTasksThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(getTasksThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addTaskThunk.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(updateTaskThunk.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(deleteTaskThunk.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(t => t.id !== action.payload);
            });
    },
});

export default taskSlice.reducer;