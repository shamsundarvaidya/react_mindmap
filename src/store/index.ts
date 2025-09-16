import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import mindmapReducer  from './mindmapSlice';
import appSettingsReducer from './appSettingsSlice';


export const store = configureStore({
  reducer: {
    mindmap: mindmapReducer,
    appSettings: appSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
