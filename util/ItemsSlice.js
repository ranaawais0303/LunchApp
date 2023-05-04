import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const itemsSlice = createApi({
  reducerPath: "itemsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.124:8000/api/Menu",
  }),
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: () => "/getItems",
      providesTags: ["Items"],
    }),

    updateItem: builder.mutation({
      query: ({ itemId, updatedData }) => {
        return {
          url: `/updateItem/${itemId}`,
          method: "PATCH",
          body: updatedData,
        };
      },
      invalidatesTags: ["Items"],
    }),

    deleteItemData: builder.mutation({
      query: (itemId) => ({
        url: `/deleteItem/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
    }),

    addItem: builder.mutation({
      query: (item) => {
        return {
          url: "/AddItem",
          method: "POST",
          body: item,
        };
      },
      invalidatesTags: ["Items"],
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  //
  useUpdateItemMutation,
  //
  useDeleteItemDataMutation,

  //
  useAddItemMutation,
} = itemsSlice;
export const itemReducer = itemsSlice.reducer;
