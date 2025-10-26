import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import mindmapReducer  from './mindmapSlice';
import themeReducer from './themeSlice';
import noteIndicatorReducer from './noteIndicatorSlice';


export const store = configureStore({
  reducer: {
    mindmap: mindmapReducer,
    theme: themeReducer,
    noteIndicator: noteIndicatorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
