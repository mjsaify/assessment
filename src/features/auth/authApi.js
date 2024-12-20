import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AuthApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        GetUserDetails: builder.query({
            query: () => ({
                url: "/user",
                method: "GET"
            }),
        }),
    }),
});

export const { useGetUserDetailsQuery } = AuthApi;