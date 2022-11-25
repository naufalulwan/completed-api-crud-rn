import { baseService } from ".";

export const personelService = baseService.injectEndpoints({
  endpoints: (builder) => ({
    getPersonel: builder.query({
      query: (perPage) => `/pers?perPage=${perPage}`,
      providesTags: ["Personel"],
    }),
    getPersonelById: builder.query({
      query: (id) => `/pers/${id}`,
      providesTags: ["Personel"],
    }),
    addPersonel: builder.mutation({
      query: (body) => ({
        url: "/pers",
        method: "POST",
        body,
      }),
      extraOptions: {
        Headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      },
      invalidatesTags: ["Personel"],
    }),
    updatePersonel: builder.mutation({
      query: (body) => ({
        url: `/pers/${body.id}`,
        method: "PATCH",
        body: body.data,
      }),
      invalidatesTags: ["Personel"],
    }),
    deletePersonel: builder.mutation({
      query: (id) => ({
        url: `/pers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Personel"],
    }),
  }),
});

export const {
  useGetPersonelQuery,
  useGetPersonelByIdQuery,
  useUpdatePersonelMutation,
  useAddPersonelMutation,
  useDeletePersonelMutation,
} = personelService;
