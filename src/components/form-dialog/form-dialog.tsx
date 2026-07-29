"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TaskDialog from '../task-dialog/task-dialog';

export interface taskData {
    title: string;
    description: string;
    status: string;
}

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                <AddIcon />
                New Task
            </Button>
            <TaskDialog open={open} onClose={() => setOpen(false)} />
        </React.Fragment>
    );
}
