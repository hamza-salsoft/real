import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config/constants';
import { allChatApis } from "./constant";



const prepareHeaders = (headers, { getState }) => {
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

function forceRefetch({ currentArg, previousArg }) {
  return true
  return currentArg !== previousArg
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, prepareHeaders }),
  tagTypes: ['Chat'],
  keepUnusedDataFor: 0,
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => allChatApis.getAllUsers,
      transformResponse: (response) => response?.data?.users,
      forceRefetch
    }),

    createChat: builder.mutation({
      query: (id) => ({
        url: allChatApis.createChat,
        method: 'POST',
        body: { userId: id },
      }),
    }),

    getMyChats: builder.query({
      query: () => allChatApis.getMyChats,
      transformResponse: (response) => response?.data,
      forceRefetch
    }),


    getAllChatMsg: builder.query({
      query: (chatId) => allChatApis.getAllChatMsg + chatId,
      transformResponse: (response) => response?.data,
      forceRefetch
    }),

    sendMessage: builder.mutation({
      query: ({ chatId, content }) => ({
        url: allChatApis.sendMessage,
        method: 'POST',
        body: { chatId, content },
      }),
    }),


  }),
})

export const { useGetAllUserQuery, useCreateChatMutation,
  useGetMyChatsQuery, useGetAllChatMsgQuery,
  useSendMessageMutation
} = chatApi
