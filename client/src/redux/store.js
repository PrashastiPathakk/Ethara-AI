import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import themeReducer from "./slices/themeSlice"
import { apiSlice } from "./slices/apiSlice"

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store
