import { configureStore } from '@reduxjs/toolkit';
import { AuthApi } from '../features/auth/authApi';
import AuthReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false }).concat(AuthApi.middleware)
    },
});