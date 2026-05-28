import {configureStore} from '@reduxjs/toolkit';
import CreateSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// Create Saga Middleware
const sagaMiddleware = CreateSagaMiddleware();

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // AsyncStorage for persisting state
  whitelist: ['user', 'savedWords'], // persist the reducers
};

// Apply persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false, // Ignore serialization checks for Redux Persist
    }).concat(sagaMiddleware);
  },
});

// Persistor
export const persistor = persistStore(store);

// Run Saga Middleware
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
