import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import { loadCSS } from 'fg-loadcss';


import { deleteEmp } from './employeeSlice';
const useStyles = makeStyles({
    root: {
        width: 'calc(100% - 40px)',
        padding: '15px'
    },
    container: {
        maxHeight: 440,
    },
});

export const EmployeeTable = ({ columns, employee, editEmployee }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    React.useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteEmpData = (id) => {
        dispatch(deleteEmp(id))
    }
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employee.length === 0 && <TableRow >
                            <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                                No Data Found
                            </TableCell>
                        </TableRow>}
                        {employee.length > 0 && employee.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                    {columns.map((column, index) => {
                                        const value = row[column.id];
                                        return column.id === 'actions' ? (
                                            <TableCell key="actions" align='center' style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                                <IconButton onClick={() => deleteEmpData(row['_id'])}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton onClick={() => editEmployee(row)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>) : <TableCell key={`employee-record-${row._id}-${index}`} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                    })}

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {employee.length > 0 && <TablePagination
                rowsPerPageOptions={[2, 5, 10, 25, 100]}
                component="div"
                count={employee.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}
        </Paper>
    );
}
