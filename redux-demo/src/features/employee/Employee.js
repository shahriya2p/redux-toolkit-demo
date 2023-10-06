import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { EmployeeTable } from './EmployeeTable'

import {
    getData,
    addEmp,
    updateEmp
} from './employeeSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
            flex: 1,
            minWidth: '250px'
        },
    },
}));

const columns = [
    { id: 'name', label: 'Name', minWidth: 50 },
    { id: 'degree', label: 'Degree', minWidth: 50 },
    {
        id: 'password',
        label: 'Password',
        minWidth: 50,
        align: 'right',
        format: (value) => value.toLocaleString(),
    },
    { id: 'actions', label: 'Actions', minWidth: 50, align: 'center' },

];


export const Employee = () => {
    const classes = useStyles();

    const [empObj, setEmp] = useState({})
    const [error, setError] = useState({ name: '', degree: '', password: '' })


    const emp = useSelector((state) => state.employee.empData);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmp({ ...empObj, [name]: value });
        setError({ ...error, [name]: '' })
    }


    const addEmployee = () => {
        setError(validate(empObj));
        if (empObj.name && empObj.degree && empObj.password) {
            dispatch(addEmp(empObj)).then((res) => {
                setEmp({ name: '', degree: '', password: '' });
            });
        }
    }

    const editEmployee = useCallback((editEmp) => {
        setError({})
        setEmp(editEmp)
    }, [])

    const updateEmployee = () => {
        dispatch(updateEmp(empObj._id, empObj)).then(() => {
            setEmp({ name: '', degree: '', password: '' });
        });
    }
    return (
        <div>
            <h1>Employee Data</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    InputLabelProps={{ shrink: true }}
                    error={!!error['name']}
                    id="employee-name"
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={empObj.name}
                    onChange={handleChange}
                    helperText={error['name']}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    error={!!error['password']}
                    id="employee-password"
                    label="Password"
                    variant="outlined"
                    name="password"
                    value={empObj.password}
                    helperText={error['password']}
                    onChange={handleChange}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    error={!!error['degree']}
                    id="employee-degree"
                    label="Degree"
                    variant="outlined"
                    name="degree"
                    value={empObj.degree}
                    helperText={error['degree']}
                    onChange={handleChange}
                />
                {
                    empObj._id ? <Button onClick={updateEmployee} size="large" variant="contained" color="primary">
                        Update Employee
                    </Button>
                        : <Button onClick={addEmployee} size="large" variant="contained" color="primary">
                            Add Employee
                        </Button>
                }

            </form>
            <EmployeeTable employee={emp} columns={columns} editEmployee={editEmployee} />
        </div>
    )
}


const validate = (data) => {
    let errors = {};
    if (!data.name?.trim()) {
        errors.name = 'Name is required';
    }
    if (!data.degree?.trim()) {
        errors.degree = 'Degree is required';
    }
    if (!data.password?.trim()) {
        errors.password = 'Password is required';
    }
    return errors;
};
