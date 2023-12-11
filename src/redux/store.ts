import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import projectReducer from "./features/projectSlice";
import groupReducer from "./features/groupSlice";
import pitchingReducer from "./features/pitchingSlice";
import phaseReducer from "./features/phaseSlice";
import categoryReducer from "./features/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
    group: groupReducer,
    pitching: pitchingReducer,
    phase: phaseReducer,
    category: categoryReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
