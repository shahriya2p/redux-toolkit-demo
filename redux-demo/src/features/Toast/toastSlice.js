import { createSlice } from '@reduxjs/toolkit';

import { toastTypes } from '../../utils/toastType';

export const slice = createSlice({
    name: 'toast',
    initialState: {
        toastData: {}
    },
    reducers: {
        success: (state, action) => {
            state.toastData = {
                type: toastTypes.Success,
                message: action.payload
            }
        },
        error: (state, action) => {
            state.toastData = {
                type: toastTypes.Error,
                message: action.payload
            };
        },
        warning: (state, action) => {
            state.toastData = {
                type: toastTypes.Warning,
                message: action.payload
            };
        },
    }
})

export const { success, error, warning } = slice.actions;
export default slice.reducer;

