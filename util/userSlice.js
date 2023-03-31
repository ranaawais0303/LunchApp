import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.124:8000/api/users",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/",
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, UpdatedUserData }) => {
        return {
          url: `/${userId}`,
          method: "PATCH",
          body: {
            firstName: UpdatedUserData.firstName,
            lastName: UpdatedUserData.lastName,
            tokenExpiry: UpdatedUserData.tokenExpiry + "s",
            isActive: UpdatedUserData.isActive,
          },
        };
      },
      invalidatesTags: ["Users"],
    }),
    deleteUserData: builder.mutation({
      query: (userId) => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserDataMutation,
} = userSlice;

export const userReducer = userSlice.reducer;
