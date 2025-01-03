import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../config/constants';
import { forceRefetch, prepareHeaders } from './coins';

export const transactionApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/transaction", prepareHeaders }),
    tagTypes: ['Transaction'],
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    // keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        getCoinLogs: builder.query({
            query: ({ userId, limit, page }) => `/logs/${userId}?limit=${limit}&page=${page}`,
            transformResponse: (response) => response.data?.logs,
            // forceRefetch,
            // extraOptions: (args) => ({
            //     refetchInterval: 1000 * 60 * 5,
            // }),
        }),
    }),
});

export const { useGetCoinLogsQuery, useLazyGetCoinLogsQuery } = transactionApi;
