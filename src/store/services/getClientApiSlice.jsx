import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8080`,
  }),
  endpoints: (builder) => ({
    getClient: builder.query({
      query: (id) => `/api/client/${id}`,
    }),
    getClients: builder.query({
      query: (fileName) => `/api/client`,
    }),
  }),
});

export const {
  useLazyGetClientQuery,
  useLazyGetClientsQuery,
} = clientApi;
