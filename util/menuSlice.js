import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const menuSlice = createApi({
  reducerPath: "menusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.124:8000/api/Menu",
  }),
  tagTypes: ["Menus"],
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => "/getMenus",
      providesTags: ["Menus"],
    }),
    getAllItems: builder.query({
      query: () => "/getItems",
      providesTags: ["Items"],
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
    updateItem: builder.mutation({
      query: ({ itemId, updatedData }) => {
        console.log("________________itemID_", itemId);
        console.log("________________itemDatta_", updatedData);
        return {
          url: `/updateItem/${itemId}`,
          method: "PATCH",
          body: updatedData,
        };
      },
      invalidatesTags: ["Items"],
    }),
    deleteMenuData: builder.mutation({
      query: (menuId) => ({
        url: `/${menuId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menus"],
    }),
    deleteItemData: builder.mutation({
      query: (itemId) => ({
        url: `/deleteItem/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
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
    addItemIntoMenu: builder.mutation({
      query: ({ menuId, itemId }) => {
        return {
          url: "/AddItemIntoMenu",
          method: "POST",
          body: { menuId, itemId },
        };
      },
      invalidatesTags: ["Menus"],
    }),
    addMenu: builder.mutation({
      query: (menu) => {
        return {
          url: "/AddMenu",
          method: "POST",
          body: menu,
        };
      },
      invalidatesTags: ["Menus"],
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
  useGetMenusQuery,
  useGetAllItemsQuery,
  //
  useUpdateMenuMutation,
  useUpdateItemMutation,
  //
  useDeleteMenuDataMutation,
  useDeleteItemDataMutation,
  //
  useUpdateCurrentMutation,
  useAddItemIntoMenuMutation,
  //
  useAddMenuMutation,
  useAddItemMutation,
} = menuSlice;
export const menuReducer = menuSlice.reducer;
