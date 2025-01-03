import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../config/constants';
import { forceRefetch, prepareHeaders } from './coins';

export const paypalApi = createApi({
    reducerPath: 'paypalApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/paypal", prepareHeaders }),
    tagTypes: ['Paypal'],
    endpoints: (builder) => ({
        getPaypalKeys: builder.query({
            query: () => "/keys",
            transformResponse: (response) => response.data,
            forceRefetch
        }),
        getPaypalTransactions: builder.query({
            query: () => "/transactions",
            transformResponse: (response) => response.transaction_details,
            forceRefetch
        }),
    }),
})

export const { useGetPaypalKeysQuery, useGetPaypalTransactionsQuery } = paypalApi
