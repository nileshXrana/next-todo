"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import styles from "./task-dialog.module.css";
import { addTaskThunk, updateTaskThunk } from '@/features/thunk';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { Task } from '@/features/tasks/task.type';
import Typography from '@mui/material/Typography';

interface TaskDialogProps {
    open: boolean;
    onClose: () => void;
    task?: Task | null;
}

export default function TaskDialog({ open, onClose, task }: TaskDialogProps) {
    const dispatch = useDispatch() as AppDispatch;

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [status, setStatus] = React.useState('Working');
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        setError('');
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        } else {
            setTitle('');
            setDescription('');
            setStatus('Working');
        }
    }, [task, open]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        if (title.trim().length < 3) {
            setError('Title must be at least 3 characters long');
            return;
        }

        const payload = {
            title,
            description,
            status,
        };

        try {
            if (task) {
                await dispatch(updateTaskThunk({ id: task.id, taskData: payload })).unwrap();
            } else {
                await dispatch(addTaskThunk(payload)).unwrap();
            }
            onClose();
        } catch (err: any) {
            const message = err?.message || 'Something went wrong';
            setError(Array.isArray(message) ? message[0] : message);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{task ? 'Edit Task' : 'Add Task'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {task ? 'Update details for this task.' : 'Enter details for the new task.'}
                </DialogContentText>
                {error && (
                    <Typography color="error" variant="body2" style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit} id="task-form">
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        required
                        margin="dense"
                        multiline
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <InputLabel className={styles.inputLabel} id="task-status-select-label">Status</InputLabel>
                    <Select
                        labelId="task-status-select-label"
                        id="task-status-select"
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value)}
                        className={styles.select}
                    >
                        <MenuItem value={"Working"}>Working</MenuItem>
                        <MenuItem value={"Pending"}>Pending</MenuItem>
                        <MenuItem value={"Completed"}>Completed</MenuItem>
                    </Select>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" form="task-form">
                    {task ? 'Save' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
