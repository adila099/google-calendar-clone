import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice';
import eventReducer from './eventSlice';
import uiReducer from './uiSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['events', 'calendar'],
};

const rootReducer = combineReducers({
  calendar: calendarReducer,
  events: eventReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;