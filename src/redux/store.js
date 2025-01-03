import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './slice/authSlice'
import { coinApi } from '../api/coins';
import { paypalApi } from '../api/paypal';
import { transactionApi } from '../api/transaction';
import { orderApi } from '../api/order';
import { chatApi } from '../views/chat/chatApiSlice';

const rootReducer = combineReducers({
  user: userReducer,
  [coinApi.reducerPath]: coinApi.reducer,
  [paypalApi.reducerPath]: paypalApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,

})

const persistConfig = {
  key: 'real_money_admin',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinApi.middleware).concat(paypalApi.middleware).concat(transactionApi.middleware).concat(orderApi.middleware).concat(chatApi.middleware),
})

export const persistor = persistStore(store)