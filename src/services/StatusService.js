import { baseService } from ".";

export const statusService = baseService.injectEndpoints({
  endpoints: (builder) => ({
    getStatuses: builder.query({
      query: () => "/statuses",
    }),
  }),
});

export const { useGetStatusesQuery, useGetStatusByIdQuery } = statusService;
