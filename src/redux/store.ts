import { configureStore } from '@reduxjs/toolkit';
import cards from './slices/cardsSlice';
import settings from './slices/settingsSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { cards, settings },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
