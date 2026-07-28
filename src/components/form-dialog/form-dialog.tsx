"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import styles from "./form-dialog.module.css";
import { addTaskThunk } from '@/features/thunk';
import { useDispatch } from 'react-redux';

export interface taskData {
    title: string;
    description: string;
    status: string;
}

export default function FormDialog() {

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const taskData: taskData = {
            title: formJson.title,
            description: formJson.description,
            status: status
        };

        // send tasks to backend:
        await dispatch(addTaskThunk(taskData) as any);

        handleClose();
    };

    const [status, setStatus] = React.useState("working");

    const handleChange = (event: any) => {
        setStatus(event.target.value as string);
    };

    return (
        <React.Fragment>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                <AddIcon />
                New Task
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter details for the new task.
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
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
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            multiline
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                        />

                        <InputLabel className={styles.inputLabel} id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            onChange={handleChange}
                            className={styles.select}
                        >
                            <MenuItem value={"working"}>Working</MenuItem>
                            <MenuItem value={"pending"}>Pending</MenuItem>
                            <MenuItem value={"completed"}>Completed</MenuItem>
                        </Select>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
