import { baseService } from ".";

export const rankService = baseService.injectEndpoints({
  endpoints: (builder) => ({
    getRanks: builder.query({
      query: () => "/ranks",
    }),
  }),
});

export const { useGetRanksQuery, useGetRankByIdQuery } = rankService;
