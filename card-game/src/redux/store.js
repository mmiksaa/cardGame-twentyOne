import { configureStore } from '@reduxjs/toolkit';
import cards from './cardsSlice';

export const store = configureStore({
  reducer: { cards },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
  }),
});
