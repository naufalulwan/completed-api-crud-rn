import { combineReducers } from "@reduxjs/toolkit";
import { rankService } from "../../services/RankService";
import { statusService } from "../../services/StatusService";
import PersonelSlice from "./PersonelSlice";

export const rootReducer = combineReducers({
  personel: PersonelSlice,
  [rankService.reducerPath]: rankService.reducer,
  [statusService.reducerPath]: statusService.reducer,
});
