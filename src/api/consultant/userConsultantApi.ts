import { ApiResponse, ApiResponseWithPagination } from "@/interfaces/api-response";
import { IUserData } from "@/interfaces/user";
import { baseApi } from "../baseApi";

export const UserConsultantApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["userConsultantList", "singleConsultantUser", "userConsultantNeedApproveList"] })
  .injectEndpoints({
    endpoints(build) {
      return {
        getAllUserConsultantWithoutPagination: build.query<
          ApiResponse<IUserData[]>,
          { page?: number; rowPerPage?: number; search?: string }
        >({
          query: (arg) => ({
            url: `/api/setting/consultant-user?noPaginate=true`,
            method: "GET",
          }),
          providesTags: ["userConsultantList"],
        }),
        getAllUserConsultant: build.query<
          ApiResponseWithPagination<IUserData[]>,
          { page?: number; rowPerPage?: number; search?: string }
        >({
          query: (arg) => ({
            url: `/api/setting/consultant-user?paginate=${arg.rowPerPage ? arg.rowPerPage : 25}&page=${
              arg.page ? arg.page : 1
            }&search=${arg.search}`,
            method: "GET",
          }),
          providesTags: ["userConsultantList"],
        }),
        getAllNeedApproveUserConsultant: build.query<
          ApiResponseWithPagination<IUserData[]>,
          { page?: number; rowPerPage?: number; search?: string }
        >({
          query: (arg) => ({
            url: `/api/consultant-registerApprove?paginate=${arg.rowPerPage ? arg.rowPerPage : 25}&page=${
              arg.page ? arg.page : 1
            }&search=${arg.search}`,
            method: "GET",
          }),
          providesTags: ["userConsultantNeedApproveList"],
        }),
        getAllSimpleUserConsultant: build.query<
          ApiResponseWithPagination<IUserData[]>,
          { page?: number; rowPerPage?: number; search?: string }
        >({
          query: (arg) => ({
            url: `/api/setting/consultant-user-simple?paginate=${arg.rowPerPage ? arg.rowPerPage : 25}&page=${
              arg.page ? arg.page : 1
            }&search=${arg.search}`,
            method: "GET",
          }),
          providesTags: ["userConsultantList"],
        }),
        getUserConsultant: build.query<ApiResponseWithPagination<IUserData>, { id: string }>({
          query: ({ id }) => ({
            url: `/api/setting/consultant-user/${id}`,
            method: "GET",
          }),
          providesTags: ["singleConsultantUser"],
        }),
        createUserConsultant: build.mutation({
          query: (data: { name: string; email: string; role: string; sales_division: string[] }) => ({
            url: "/api/setting/consultant-user",
            method: "POST",
            data: {
              name: data.name,
              email: data.email,
              role: data.role,
              sales_division: data.sales_division,
            },
          }),
          invalidatesTags: ["userConsultantList"],
        }),
        updateUserConsultant: build.mutation<
          ApiResponse<null>,
          {
            data: {
              name: string;
              email: string;
              role: string;
              status: string;
              sales_division: string[];
            };
            id: string | any;
          }
        >({
          query: ({ data, id }) => ({
            url: `/api/setting/consultant-user/${id}`,
            method: "PATCH",
            data: {
              name: data.name,
              email: data.email,
              role: data.role,
              status: data.status,
              sales_division: data.sales_division,
            },
          }),
          invalidatesTags: ["singleConsultantUser", "userConsultantList"],
        }),
        approveUserConsultant: build.mutation<
          ApiResponse<null>,
          { id: string; data: { decision: string; reason: string } | any }
        >({
          query: ({ id, data }) => ({
            url: `/api/consultant-registerApprove/${id}`,
            method: "PATCH",
            data: {
              decision: data.decision,
              reason: data.reason,
            },
          }),
          invalidatesTags: ["userConsultantNeedApproveList"],
        }),
        resetPasswordConsultant: build.mutation<ApiResponse<null>, { id: string | any }>({
          query: ({ id }) => ({
            url: `/api/consultant-reset-password/${id}`,
            method: "PATCH",
          }),
          invalidatesTags: ["userConsultantList"],
        }),
        deleteUserConsultant: build.mutation<ApiResponse<null>, { id: string | any }>({
          query: ({ id }) => ({
            url: `/api/setting/consultant-user/${id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["userConsultantList"],
        }),
      };
    },
  });

export const {
  useGetAllUserConsultantWithoutPaginationQuery,
  useGetUserConsultantQuery,
  useGetAllUserConsultantQuery,
  useGetAllNeedApproveUserConsultantQuery,
  useGetAllSimpleUserConsultantQuery,
  useCreateUserConsultantMutation,
  useUpdateUserConsultantMutation,
  useResetPasswordConsultantMutation,
  useDeleteUserConsultantMutation,
  useApproveUserConsultantMutation,
} = UserConsultantApi;
