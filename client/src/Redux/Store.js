import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import questionReducer from "./Reducers/questionReducer";
import resultReducer from "./Reducers/resultReducer";
import { licenseReducer } from "./Reducers/licenseReducer";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  userReducer,
  questionReducer,
  resultReducer,
  licenseReducer,
});

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
