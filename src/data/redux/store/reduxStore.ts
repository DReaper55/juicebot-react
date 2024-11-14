import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import foodSlice from "../reducers/foodReducer";
import drinkSlice from "../reducers/drinkReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedFoodReducer = persistReducer(persistConfig, foodSlice);
const persistedDrinkReducer = persistReducer(persistConfig, drinkSlice);

const store = configureStore({
  reducer: {
    foodStore: persistedFoodReducer,
    drinkStore: persistedDrinkReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
