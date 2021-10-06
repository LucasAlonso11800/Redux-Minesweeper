import { GridColumns } from "@material-ui/data-grid";

export const tableColumns: GridColumns = [
    {
        field: 'level',
        headerName: 'Level',
        width: 150,
    },
    {
        field: 'user',
        headerName: 'User',
        width: 300,
    },
    {
        field: 'time',
        headerName: 'Time',
        width: 300,
    }
];