"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getTasksThunk, updateTaskThunk, deleteTaskThunk } from '@/features/thunk';
import { AppDispatch } from '@/store';
import { useRouter } from 'next/navigation';
import TaskDialog from '../task-dialog/task-dialog';
import { Task } from '@/features/tasks/task.type';

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
    const dispatch = useDispatch() as AppDispatch;
    const { tasks, loading } = useSelector((state: any) => state.tasks);
    const router = useRouter();

    const [editOpen, setEditOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleEditClick = (task: Task) => {
        setSelectedTask(task);
        setEditOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        dispatch(deleteTaskThunk(id));
    };

    useEffect(() => {
        dispatch(getTasksThunk())
            .unwrap()
            .catch((err: any) => {
                const status = err?.status || err?.response?.status;
                if (status === 401 || err?.statusCode === 401 || (err?.message && err.message.includes('401'))) {
                    router.push('/login');
                }
            });
    }, [dispatch, router]);

    const checkedIds = tasks ? tasks.filter((t: any) => t.checked).map((t: any) => t.id) : [];

    const rowSelectionModel: GridRowSelectionModel = {
        type: 'include',
        ids: new Set(checkedIds)
    };

    const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
        const currentChecked = tasks ? tasks.filter((t: any) => t.checked).map((t: any) => t.id) : [];
        const newSelectionIds = Array.from(newSelection.ids);
        
        const toggledId = newSelectionIds.find((id: any) => !currentChecked.includes(id as number))
            || currentChecked.find((id: number) => !newSelection.ids.has(id));
            
        if (toggledId) {
            const taskExists = tasks ? tasks.some((t: any) => t.id === toggledId) : false;
            if (taskExists) {
                const isChecked = newSelection.ids.has(toggledId);
                dispatch(updateTaskThunk({ id: toggledId as number, taskData: { checked: isChecked } }));
            }
        }
    };

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'description', headerName: 'Description', width: 350 },
        { field: 'status', headerName: 'Status', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 180,
            renderCell: (params) => (
                <Box>
                    <Button
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(params.row);
                        }}
                    >
                        Update
                    </Button>
                    <Button
                        size="small"
                        color="error"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(params.row.id);
                        }}
                    >
                        Delete
                    </Button>
                </Box>
            )
        }
    ];

    return (
        <>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={tasks || []}
                    columns={columns}
                    loading={loading}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={handleSelectionChange}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{
                        border: 0,
                        '& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root': {
                            display: 'none',
                        },
                    }}
                />
            </Paper>
            <TaskDialog open={editOpen} onClose={() => setEditOpen(false)} task={selectedTask} />
        </>
    );
}
