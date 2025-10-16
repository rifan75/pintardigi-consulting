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

export const profileConsultantApi = baseApi.enhanceEndpoints({ addTagTypes: ["consultantprofile"] }).injectEndpoints({
  endpoints(builder) {
    return {
      changeConsultantPassword: builder.mutation({
        query: (data: ChangePasswordRequestBody) => ({
          url: "/api/consultant-change-password",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
          },
          data,
        }),
        invalidatesTags: ["consultantprofile"],
      }),
      changeConsultantData: builder.mutation({
        query: (data: ChangeDataRequestBody) => ({
          url: "/api/consultant-change-data",
          method: "PATCH",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
          },
          data,
        }),
        invalidatesTags: ["consultantprofile"],
      }),
      avatarConsultant: builder.mutation<{ message: string }, FormData>({
        query: (data) => ({
          url: "/api/consultant-avatar",
          method: "POST",
          data: data,
        }),
        invalidatesTags: ["consultantprofile"],
      }),
      getMyProfileConsultant: builder.query<ApiResponse<IUserData>, any>({
        query: () => ({
          url: `/api/consultant-my-profile`,
          method: "GET",
        }),
        providesTags: ["consultantprofile"],
      }),
    };
  },
});

export const {
  useChangeConsultantPasswordMutation,
  useChangeConsultantDataMutation,
  useAvatarConsultantMutation,
  useGetMyProfileConsultantQuery,
  useLazyGetMyProfileConsultantQuery
} = profileConsultantApi;
