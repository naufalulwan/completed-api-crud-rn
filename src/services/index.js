import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config";

export const baseService = createApi({
  reducerPath: "ServiceAPI",
  baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
  tagTypes: ["Personel"],
  endpoints: () => ({}),
});
