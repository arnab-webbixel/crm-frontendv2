

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default is localStorage
import rootReducer from './index'; 

// Persist configuration
const persistConfig = {
  key: 'root',    // Key to identify the persisted data
  storage,        // Storage type
  whitelist: ['clients', 'auth', 'staff'],  // Specify which slices to persist
  // blacklist: ['auth'],     // Optionally, exclude other slices like `auth`
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);

export { store, persistor };
