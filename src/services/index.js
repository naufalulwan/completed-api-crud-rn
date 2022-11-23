import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseService = createApi({
  reducerPath: "Service API",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mabesal.indi.network/api" }),
  tagTypes: ["Personel"],
  endpoints: () => ({}),
});
