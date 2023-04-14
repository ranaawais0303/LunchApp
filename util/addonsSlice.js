import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addonsSlice = createApi({
  reducerPath: "addonsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.124:8000/api/Addons",
  }),
  tagTypes: ["Addons"],
  endpoints: (builder) => ({
    getAddons: builder.query({
      query: () => "/getItems",
      providesTags: ["Addons"],
    }),
    addAddons: builder.mutation({
      query: (item) => {
        return {
          url: "/addItem",
          method: "POST",
          body: item,
        };
      },
      invalidatesTags: ["Addons"],
    }),
    updateAddons: builder.mutation({
      query: ({ itemId, updatedAddonsData }) => {
        return {
          url: `/updateItem/${itemId}`,
          method: "PATCH",
          body: updatedAddonsData,
        };
      },
      invalidatesTags: ["Addons"],
    }),
    deleteAddonsData: builder.mutation({
      query: (itemId) => ({
        url: `/deleteItem/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addons"],
    }),
  }),
});

export const {
  useGetAddonsQuery,
  useAddAddonsMutation,
  useDeleteAddonsDataMutation,
  useUpdateAddonsMutation,
} = addonsSlice;

export const addonsReducer = addonsSlice.reducer;
