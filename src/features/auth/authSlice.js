import { createSlice } from "@reduxjs/toolkit";
import { DeleteUser, DeleteUserProfile, ForgotPasswordLink, GetAllUsers, LoginUser, LogoutUser, RegisterUser, ResetPasswordLink, UpdateUserProfile, UpdateUserStatus } from "./authAction";

const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const initialState = {
    isLoading: false,
    user: null,
    role: null,
    token,
    error: null,
    success: false,
    totalUsers: null,
    totalPages: null,
    currentPage: null
};

export const AuthSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.data.user;
            state.role = action.payload.data.user.role;
        }
    },
    extraReducers: (builder) => {
        builder
            // Signup
            .addCase(RegisterUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(RegisterUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(RegisterUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })


            // Login
            .addCase(LoginUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data.user;
                state.role = action.payload.data.user.role;
                state.token = action.payload.data.token;
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })

            // Logout
            .addCase(LogoutUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(LogoutUser.fulfilled, (state) => {
                localStorage.removeItem('token');
                state.isLoading = false;
                state.user = null;
                state.role = null;
                state.token = null;
                state.error = null
            })
            .addCase(LogoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })

            // Update Profile
            .addCase(UpdateUserProfile.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(UpdateUserProfile.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(UpdateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })

            // Delete Profile
            .addCase(DeleteUserProfile.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(DeleteUserProfile.fulfilled, (state) => {
                localStorage.removeItem('token');
                state.isLoading = false;
                state.user = null;
                state.token = null;
                state.error = null
            })
            .addCase(DeleteUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })

            // Get All Users
            .addCase(GetAllUsers.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(GetAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.totalUsers = action.payload.data.totalUsers;
                state.totalPages = action.payload.data.totalPages;
                state.currentPage = action.payload.data.currentPage;
            })
            .addCase(GetAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })

            // Update User Role
            .addCase(UpdateUserStatus.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(UpdateUserStatus.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null
            })
            .addCase(UpdateUserStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })


            // Delete USer
            .addCase(DeleteUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(DeleteUser.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(DeleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })

            // Forgot Password
            .addCase(ForgotPasswordLink.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(ForgotPasswordLink.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(ForgotPasswordLink.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })


            // Reset Password
            .addCase(ResetPasswordLink.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(ResetPasswordLink.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(ResetPasswordLink.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            })
    }
});

export const { setCredentials } = AuthSlice.actions;
export default AuthSlice.reducer;