import { createSlice } from '@reduxjs/toolkit';
import { success, error, warning } from '../Toast/toastSlice';

import { addEmpService, deleteEmpService, getEmpService, updateEmpService } from './employeeService'

export const slice = createSlice({
    name: 'employee',
    initialState: {
        empData: [],
        value: 0,
    },
    reducers: {
        getEmployee: (state, action) => { //reducer case
            state.empData = action.payload;
        },
        addEmployee: (state, action) => {
            state.empData = [...state.empData, action.payload]
        },
        deleteEmployee: (state, action) => {
            state.empData = [...state.empData.filter((e) => e._id !== action.payload)]
        },
        updateEmployee: (state, action) => {
            const index = state.empData.findIndex((e) => e._id === action.payload.id);
            state.empData.splice(index, 1, action.payload.emp);
        }
    }
})
export const getData = () => dispatch => {
    getEmpService()
        .then(
            data => dispatch(getEmployee(data.data)),
            (err) => {
                dispatch(error(err.message))
            },
        );
};

export const addEmp = (emp) => dispatch => {
    return addEmpService(emp)
        .then(
            data => {
                dispatch(success('Add Employee Successfully'));
                dispatch(addEmployee(data.data))
            },
            (err) => {
                dispatch(error(err.message))
            },
        );
};

export const deleteEmp = (id) => dispatch => {
    deleteEmpService(id)
        .then(
            data => {
                dispatch(error('Delete Employee Successfully'));
                dispatch(deleteEmployee(data.data.emp._id))
            },
            (err) => {
                dispatch(error(err.message))
            },
        );
};

export const updateEmp = (id, empObj) => dispatch => {
    return updateEmpService(id, empObj)
        .then(
            data => {
                dispatch(warning('Update Employee Successfully'));
                dispatch(updateEmployee({ id: data.data.emp._id, emp: empObj }))
            },
            (err) => {
                dispatch(error(err.message))
            },
        );
};

export const { getEmployee, addEmployee, deleteEmployee, updateEmployee } = slice.actions;
export default slice.reducer;


