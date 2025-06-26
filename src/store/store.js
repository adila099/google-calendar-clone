import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch, useSelector } from 'react-redux';
import calendarReducer from './calendarSlice';

const persistConfig = {
  key: 'calendar',
  storage,
  whitelist: ['events', 'displayDate', 'viewMode']
};

const persistedReducer = persistReducer(persistConfig, calendarReducer);

export const store = configureStore({
  reducer: {
    calendar: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);


export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;