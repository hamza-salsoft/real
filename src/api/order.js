import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../config/constants';
import { forceRefetch, prepareHeaders } from './coins';
import { createQueryString } from '../config/functions';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/order", prepareHeaders }),
    tagTypes: ['Order'],
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (query) => {
                const queryString = createQueryString(query)?.toString();
                return `?${queryString}`
            },
            transformResponse: (response) => response?.data?.orders,
        }),
    }),
});

export const { useGetAllOrdersQuery } = orderApi;
