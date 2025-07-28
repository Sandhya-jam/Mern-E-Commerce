import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from "@reduxjs/toolkit/query/react"
import { apiSlice } from './api/apiSlice'
import authReducer from './features/auth/authSlice'
import favoritesReducer from '../Redux/features/favorites/favoriteSlice'
import { getFavoritesFromLocalStrorage } from '../Utils/localStorage'

const initialFavorites=getFavoritesFromLocalStrorage() || []

const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
        favorites:favoritesReducer,
    },
    preloadedState:{
        favorites:initialFavorites
    },
    
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),devTools:true,
});

setupListeners(store.dispatch);
export default store;