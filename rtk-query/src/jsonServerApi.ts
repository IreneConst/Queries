import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewUser } from './types';

export const jsonServerApi = createApi({
    reducerPath: 'jsonServerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api/users/' }),
    endpoints: (builder) => ({
      getUsers: builder.query({
        query: () => '',
        keepUnusedDataFor: 60000,
      }),

      addUser: builder.mutation({
        query: (user) => ({
          method: 'POST',
          url: '',
          body: user,
        }),
      }),

      deleteUser: builder.mutation({
        query: (id) => ({
          method: 'DELETE',
          url: `${id}`,
        }),
      }),

      editUser: builder.mutation({
        query: (newData: NewUser) => ({
          method: 'PUT',
          url: `${newData.id}`,
          body: newData,
        }),
      }),
    }),
  });
  
  export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useEditUserMutation } = jsonServerApi;
