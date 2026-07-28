import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/users/user.slice'
import taskReducer from './features/tasks/task.slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        users: userReducer,
        tasks: taskReducer,
    }
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()