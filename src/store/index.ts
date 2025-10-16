// ==============================|| REDUX - MAIN STORE ||============================== //

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import menuReducer from "./menuSlice";
import customizationReducer from "./customizationReducer";
// import { baseApi } from '@/_api/axios';
import { baseApi } from "@/api/baseApi";

// ==============================|| REDUX - MAIN STORE ||============================== //

export const store = configureStore({
  reducer: {
    customization: customizationReducer,
    menu: menuReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
