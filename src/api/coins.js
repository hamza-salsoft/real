import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../config/constants';

export const prepareHeaders = (headers, { getState }) => {
    try {
        const token = getState()?.user?.userToken;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    } catch (error) {
        console.log(error)
    }
};

export function forceRefetch({ currentArg, previousArg }) {
    return true
    return currentArg !== previousArg
}

export const coinApi = createApi({
    reducerPath: 'coinApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/coins", prepareHeaders }),
    tagTypes: ['Coins'],
    endpoints: (builder) => ({
        getRedeemRequests: builder.query({
            query: () => "/redeem/requests",
            forceRefetch
        }),
    }),
})

export const { useGetRedeemRequestsQuery } = coinApi
