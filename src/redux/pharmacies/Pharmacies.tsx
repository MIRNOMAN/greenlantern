import { baseApi } from "@/redux/api/baseApi";

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    formSubmit: builder.mutation({
      query: (credentials) => ({
        url: "/pharmacies",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User", "Pharmacies"],
    }),
    getPharmacies: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/pharmacies",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["User", "Pharmacies"],
    }),
    getSinglePharmacy: builder.query({
      query: (id) => ({
        url: `/pharmacies/${id}`,
        method: "GET",
      }),
      providesTags: ["User", "Pharmacies"],
    }),
    updatePharmacies: builder.mutation({
      query: (payload) => ({
        url: `/pharmacies/${payload.id}`,
        method: "PUT",
        body: payload.data,
      }),
      invalidatesTags: ["User", "Pharmacies"],
    }),
  }),
});

export const {
  useFormSubmitMutation,
  useGetSinglePharmacyQuery,
  useGetPharmaciesQuery,
  useUpdatePharmaciesMutation,
} = authApi;
