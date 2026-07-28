import { Box, Button, Typography } from "@mui/material";
import DataTable from "@/components/table/table";
import styles from "./dashboard.module.css";
import AddIcon from '@mui/icons-material/Add';
import FormDialog from "@/components/form-dialog/form-dialog";

export default function Dashboard() {
    return (
        <Box>
            <Box className={styles.dashboardHeader}>
                <Typography variant="h4" className={styles.dashboardTitle}>To-Do App</Typography>
                <FormDialog />
            </Box>

            <Box className={styles.tableContainer}>
                <DataTable />
            </Box>

        </Box>
    );
}