import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    formSubmit: builder.mutation({
      query: (credentials) => ({
        url: "/pharmacies",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    getpharmacies: builder.query({
      query: () => ({
        url: "/pharmacies",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useFormSubmitMutation, useGetpharmaciesQuery } = authApi;
