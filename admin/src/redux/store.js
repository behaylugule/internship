import { configureStore,combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import usersRedux from './usersRedux'
import varifyUser from './varifyUser'
import departmentRedux from './departmentRedux'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'


import userRedux from './userRedux'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
 

const persistedReducer = persistReducer(persistConfig, userRedux)

export const store = configureStore({
        reducer: {user:persistedReducer,
          users:usersRedux,
          varifyUsers:varifyUser,
          departments:departmentRedux},
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
     })

 export let persistor = persistStore(store)
