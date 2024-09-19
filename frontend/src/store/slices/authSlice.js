import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Signup thunk
export const signup = createAsyncThunk(
    'auth/signup',
    async (user, { rejectWithValue }) => {
        try {
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/user/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(user),
            });
            const res_data = await res.json();
            toast.success("Signup successful");
            return res_data;
        } catch (error) {
            toast.error("Signup failed");
            return rejectWithValue(error.message);
        }
    }
);

// Signin thunk
export const signin = createAsyncThunk(
    'auth/signin',
    async (user, { rejectWithValue }) => {
        try {
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/user/auth', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(user),
            });
            const res_data = await res.json();
            console.log('res_data.userId');
            console.log(res_data.userId);

            if (res_data.status === 'success') {
                toast.success("Signin successful");
                localStorage.setItem('fakeAPI_ID', res_data.userId)
                window.location.href = '/dashboard';
                return res_data;
            } else {
                toast.warn("Invalid credentials");
            }
            return res_data;
        } catch (error) {
            toast.error("Signin failed");
            return rejectWithValue(error.message);
        }
    }
);

// setAuth thunk
export const setAuth = createAsyncThunk(
    'auth/setAuth',
    async (ID, { rejectWithValue }) => {
        
        try {
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/user/me', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({ ID }),
            });
            const res_data = await res.json();
            return res_data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// Signin thunk
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        token: '',
        isAuthenticated: false,
        error: null
    },
    reducers: {
        logout: (state, action) => {
            console.log('logout');
            localStorage.removeItem('fakeAPI_ID', null);
            state.user = {};
            state.token = '';
            state.isAuthenticated = false;
            window.location.href = '/';
        },
        Oath: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // setAuth builder
        builder
            .addCase(setAuth.fulfilled, (state, action) => { // SetAuth fulfilled
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(setAuth.rejected, (state, action) => { // SetAuth rejected
                state.error = action.payload;
            })
            .addCase(signup.fulfilled, (state, action) => {  // Signup fulfilled
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => { // Signup rejected
                state.error = action.payload;
            }) // Signin builder
            .addCase(signin.fulfilled, (state, action) => {  // Signin fulfilled
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(signin.rejected, (state, action) => { // Signin rejected
                state.error = action.payload;
            });
    }
});

export const { logout, Oath } = authSlice.actions;
export default authSlice.reducer;