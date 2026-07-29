import { LoginFormData } from "@/components/login/login";
import { SignupFormData } from "@/components/signup/signup";
import { taskData } from "@/components/form-dialog/form-dialog";
import axios from "axios";

axios.defaults.withCredentials = true;

export const login = async (user: LoginFormData) => {
    try {
        const response = await axios.post("http://localhost:8000/auth/login",
            {
                email: user.email,
                password: user.password
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signup = async (user: SignupFormData) => {
    try {
        const response = await axios.post("http://localhost:8000/auth/signup",
            {
                name: user.name,
                email: user.email,
                password: user.password
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addTask = async (taskData: taskData) => {
    try {
        const response = await axios.post("http://localhost:8000/tasks", taskData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTasks = async () => {
    try {
        const response = await axios.get("http://localhost:8000/tasks");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateTask = async (id: number, taskData: Partial<taskData> & { checked?: boolean }) => {
    try {
        const response = await axios.patch(`http://localhost:8000/tasks/${id}`, taskData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTask = async (id: number) => {
    try {
        const response = await axios.delete(`http://localhost:8000/tasks/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post("http://localhost:8000/auth/logout");
        return response.data;
    } catch (error) {
        throw error;
    }
};