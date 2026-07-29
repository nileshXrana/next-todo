"use client";

import { Box, Button, Typography } from "@mui/material";
import DataTable from "@/components/table/table";
import styles from "./dashboard.module.css";
import FormDialog from "@/components/form-dialog/form-dialog";
import { logout } from "@/services/task.service";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    const handleSignout = async () => {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box>
            <Box className={styles.dashboardHeader}>
                <Typography variant="h4" className={styles.dashboardTitle}>To-Do App</Typography>
                <Box style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <FormDialog />
                    <Button variant="outlined" color="primary" onClick={handleSignout}>
                        Sign Out
                    </Button>
                </Box>
            </Box>

            <Box className={styles.tableContainer}>
                <DataTable />
            </Box>
        </Box>
    );
}