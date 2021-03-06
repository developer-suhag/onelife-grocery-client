import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import grocerySlice from "./slices/grocerySlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";

const persistConfig = {
  key: "oneLifeGrocery",
  storage,
  blacklist: ["oneLifeGrocery"],
};

const reducers = combineReducers({
  oneLifeGrocery: grocerySlice,
  groceryCart: cartSlice,
  orderedGroceries: orderSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
