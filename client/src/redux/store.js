import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// create combineReducers

const rootReducer = combineReducers({ user: userReducer });

// we also want persistConfig to define the localstorage version and storage
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// create persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  //   key-value pair where user is the key to access the userReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
