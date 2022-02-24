import { configureStore,} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
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
import documentRedux from './documentRedux'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  

const persistedReducer = persistReducer(persistConfig, userRedux)

export const store = configureStore({
        reducer: { user:persistedReducer,documents:documentRedux},
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

 export let persistor = persistStore(store)
