import { createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Signup thunk
export const CreateProject = createAsyncThunk(
    'project/create',
    async (project, { rejectWithValue }) => {
        console.log('project');
        console.log(project);
        
    }
);

// Signin thunk
const projectSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        token: '',
        isAuthenticated: false,
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        // Create Project builder
        builder
            .addCase(CreateProject.fulfilled, (state, action) => {
                // state.user = action.payload.user;
                // state.token = action.payload.token;
                // state.isAuthenticated = true;
                // state.error = null;
            })
    }
});

export const { logout, Oath } = projectSlice.actions;
export default projectSlice.reducer;