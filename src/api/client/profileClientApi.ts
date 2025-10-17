import { ApiResponse } from "@/interfaces/api-response";
import { baseApi } from "../baseApi";
import { IUserData } from "@/interfaces/user";

export interface ChangePasswordRequestBody {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface ChangeDataRequestBody {
  name: string;
  email: string;
}

export const profileClientApi = baseApi.enhanceEndpoints({ addTagTypes: ["clientprofile"] }).injectEndpoints({
  endpoints(builder) {
    return {
      changeClientPassword: builder.mutation({
        query: (data: ChangePasswordRequestBody) => ({
          url: "/api/v1/client-change-password",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
          },
          data,
        }),
        invalidatesTags: ["clientprofile"],
      }),
      changeClientData: builder.mutation({
        query: (data: ChangeDataRequestBody) => ({
          url: "/api/v1/client-change-data",
          method: "PATCH",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
          },
          data,
        }),
        invalidatesTags: ["clientprofile"],
      }),
      avatarClient: builder.mutation<{ message: string }, FormData>({
        query: (data) => ({
          url: "/api/v1/client-avatar",
          method: "POST",
          data: data,
        }),
        invalidatesTags: ["clientprofile"],
      }),
      getMyProfileClient: builder.query<ApiResponse<IUserData>, any>({
        query: () => ({
          url: `/api/v1/client-my-profile`,
          method: "GET",
        }),
        providesTags: ["clientprofile"],
      }),
    };
  },
});

export const {
  useChangeClientPasswordMutation,
  useChangeClientDataMutation,
  useAvatarClientMutation,
  useGetMyProfileClientQuery,
  useLazyGetMyProfileClientQuery
} = profileClientApi;
