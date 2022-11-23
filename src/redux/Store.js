import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { personelService } from "../services/PersonelService";
import { rankService } from "../services/RankService";
import { statusService } from "../services/StatusService";
import { rootReducer } from "./slices";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    persistedReducer,
    [personelService.reducerPath]: personelService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      imuatableCheck: false,
    }).concat(
      personelService.middleware,
      rankService.middleware,
      statusService.middleware
    ),
});

const persistor = persistStore(store);
export { store, persistor };
