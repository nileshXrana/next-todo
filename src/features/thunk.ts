import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTask, getTasks, login, signup, updateTask, deleteTask } from '../services/task.service';
import { SignupFormData } from '@/components/signup/signup';
import { LoginFormData } from '@/components/login/login';
import { taskData } from '@/components/form-dialog/form-dialog';

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (user: LoginFormData, { rejectWithValue }) => {
        try {
            const res = await login(user);
            if (res?.error) {
                return rejectWithValue(res.error);
            }
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const signupThunk = createAsyncThunk(
    'auth/signup',
    async (user: SignupFormData, { rejectWithValue }) => {
        try {
            const res = await signup(user);
            if (res?.error) {
                return rejectWithValue(res.error);
            }
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addTaskThunk = createAsyncThunk(
    'tasks/addTask',
    async (taskData: taskData, { rejectWithValue }) => {
        try {
            const res = await addTask(taskData);
            if (res?.error) {
                return rejectWithValue(res.error);
            }
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getTasksThunk = createAsyncThunk(
    'tasks/getTasks',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getTasks();
            if (res?.error) {
                return rejectWithValue(res.error);
            }
            return res;
        } catch (error: any) {
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data?.message || error.message
            });
        }
    }
);

export const updateTaskThunk = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, taskData }: { id: number; taskData: any }, { rejectWithValue }) => {
        try {
            const res = await updateTask(id, taskData);
            if (res?.error) {
                return rejectWithValue(res.error);
            }
            return res;
        } catch (error: any) {
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data?.message || error.message
            });
        }
    }
);

export const deleteTaskThunk = createAsyncThunk(
    'tasks/deleteTask',
    async (id: number, { rejectWithValue }) => {
        try {
            await deleteTask(id);
            return id;
        } catch (error: any) {
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data?.message || error.message
            });
        }
    }
);