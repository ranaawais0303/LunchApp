import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const menuSlice = createApi({
  reducerPath: "menusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.124:8000/api/Menu",
  }),
  tagTypes: ["Menus"],
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => "/getMenus",
      providesTags: ["Menus"],
    }),
    getAllItems: builder.query({
      query: () => "/getItems",
      invalidatesTags: ["Menus"],
    }),
    updateMenu: builder.mutation({
      query: ({ menuId, UpdatedmenuData }) => {
        return {
          url: `/${menuId}`,
          method: "PATCH",
          body: UpdatedmenuData,
        };
      },
      invalidatesTags: ["Menus"],
    }),
    deleteMenuData: builder.mutation({
      query: (menuId) => ({
        url: `/${menuId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menus"],
    }),

    updateCurrent: builder.mutation({
      query: (menuId) => {
        console.log("here is update current from slice method", menuId);
        return {
          url: `updateCurr/${menuId}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["Menus"],
    }),
  }),
});

export const {
  useGetMenusQuery,
  useGetAllItemsQuery,
  useUpdateMenuMutation,
  useDeleteMenuDataMutation,
  useUpdateCurrentMutation,
} = menuSlice;
export const menuReducer = menuSlice.reducer;
