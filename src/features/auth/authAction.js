import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerConfig } from '../../utils/axiosConfig';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const LoginUser = createAsyncThunk("auth/login", async (loginData, { rejectWithValue }) => {
    const { email, password } = loginData;
    try {
        const { data } = await axios.post(`${BASE_URL}/login`, { email, password }, headerConfig);
        localStorage.setItem("token", data.data.token);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    };
});

export const RegisterUser = createAsyncThunk("auth/signup", async (formData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/signup`, { formData }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        return rejectWithValue(error);
    };
});

export const LogoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/user/logout`, {}, headerConfig);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    };
});

export const UpdateUserProfile = createAsyncThunk("user/profileUpdate", async (formData, { rejectWithValue }) => {
    try {
        const { data } = await axios.patch(`${BASE_URL}/user/update-profile`, formData, headerConfig);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    };
});

export const DeleteUserProfile = createAsyncThunk("user/profileDelete", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/user/delete-profile`, headerConfig);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    };
});


export const GetAllUsers = createAsyncThunk("user/allUsers", async (page = 1, { rejectWithValue }) => {
    try {
        const { data } = await axios(`${BASE_URL}/admin/all-users?page=${page}`, headerConfig);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    };
});



export const UpdateUserStatus = createAsyncThunk("user/updateUserStatus", async (formData, { rejectWithValue }) => {
    try {
        const { data } = await axios.patch(`${BASE_URL}/admin/update-user-status`, { formData }, headerConfig);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    };
});


export const DeleteUser = createAsyncThunk("user/deleteUser", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/admin/delete-user/${id}`, headerConfig);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    };
});


export const ForgotPasswordLink = createAsyncThunk("user/forgotPassword", async (email, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/forgot-password`, email, headerConfig);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    };
});


export const ResetPasswordLink = createAsyncThunk("user/resetPassword", async (formData, { rejectWithValue }) => {
    try {
        const { newPassword, confirmPassword, token } = formData;
        const { data } = await axios.post(`${BASE_URL}/reset-password?token=${token}`, { newPassword, confirmPassword }, headerConfig);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    };
});
