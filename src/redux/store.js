import { configureStore } from '@reduxjs/toolkit';
import cards from './slices/cardsSlice';
import settings from './slices/settingsSlice';

export const store = configureStore({
  reducer: { cards, settings },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
  }),
});
