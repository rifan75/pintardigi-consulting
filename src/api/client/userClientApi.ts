import { ApiResponse, ApiResponseWithPagination } from "@/interfaces/api-response";
import { IUserData } from "@/interfaces/user";
import { baseApi } from "../baseApi";

export const UserClientApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["userClientList", "singleClientUser", "userClientNeedApproveList"] })
  .injectEndpoints({
    endpoints(build) {
      return {
        getAllUserClientWithoutPagination: build.query<
          ApiResponse<IUserData[]>,
          { page?: number; rowPerPage?: number; search?: string }
        >({
          query: (arg) => ({
            url: `/api/setting/client-user?noPaginate=true`,
            method: "GET",
          }),
          providesTags: ["userClientList"],
        }),
        getAllUserClient: build.query<
          ApiResponseWithPagination<IUserData[]>,
          { page?: number; rowPerPage?: number; search?: string }
        >({
          query: (arg) => ({
            url: `/api/setting/client-user?paginate=${arg.rowPerPage ? arg.rowPerPage : 25}&page=${
              arg.page ? arg.page : 1
            }&search=${arg.search}`,
            method: "GET",
          }),
          providesTags: ["userClientList"],
        }),
        getAllNeedApproveUserClient: build.query<
          ApiResponseWithPagination<IUserData[]>,
          { page?: number; rowPerPage?: number; search?: string }
        >({
          query: (arg) => ({
            url: `/api/client-registerApprove?paginate=${arg.rowPerPage ? arg.rowPerPage : 25}&page=${
              arg.page ? arg.page : 1
            }&search=${arg.search}`,
            method: "GET",
          }),
          providesTags: ["userClientNeedApproveList"],
        }),
        getAllSimpleUserClient: build.query<
          ApiResponseWithPagination<IUserData[]>,
          { page?: number; rowPerPage?: number; search?: string }
        >({
          query: (arg) => ({
            url: `/api/setting/client-user-simple?paginate=${arg.rowPerPage ? arg.rowPerPage : 25}&page=${
              arg.page ? arg.page : 1
            }&search=${arg.search}`,
            method: "GET",
          }),
          providesTags: ["userClientList"],
        }),
        getUserClient: build.query<ApiResponseWithPagination<IUserData>, { id: string }>({
          query: ({ id }) => ({
            url: `/api/setting/client-user/${id}`,
            method: "GET",
          }),
          providesTags: ["singleClientUser"],
        }),
        createUserClient: build.mutation({
          query: (data: { name: string; email: string; role: string; sales_division: string[] }) => ({
            url: "/api/setting/client-user",
            method: "POST",
            data: {
              name: data.name,
              email: data.email,
              role: data.role,
              sales_division: data.sales_division,
            },
          }),
          invalidatesTags: ["userClientList"],
        }),
        updateUserClient: build.mutation<
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
            url: `/api/setting/client-user/${id}`,
            method: "PATCH",
            data: {
              name: data.name,
              email: data.email,
              role: data.role,
              status: data.status,
              sales_division: data.sales_division,
            },
          }),
          invalidatesTags: ["singleClientUser", "userClientList"],
        }),
        approveUserClient: build.mutation<
          ApiResponse<null>,
          { id: string; data: { decision: string; reason: string } | any }
        >({
          query: ({ id, data }) => ({
            url: `/api/client-registerApprove/${id}`,
            method: "PATCH",
            data: {
              decision: data.decision,
              reason: data.reason,
            },
          }),
          invalidatesTags: ["userClientNeedApproveList"],
        }),
        resetPasswordClient: build.mutation<ApiResponse<null>, { id: string | any }>({
          query: ({ id }) => ({
            url: `/api/client-reset-password/${id}`,
            method: "PATCH",
          }),
          invalidatesTags: ["userClientList"],
        }),
        deleteUserClient: build.mutation<ApiResponse<null>, { id: string | any }>({
          query: ({ id }) => ({
            url: `/api/setting/client-user/${id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["userClientList"],
        }),
      };
    },
  });

export const {
  useGetAllUserClientWithoutPaginationQuery,
  useGetUserClientQuery,
  useGetAllUserClientQuery,
  useGetAllNeedApproveUserClientQuery,
  useGetAllSimpleUserClientQuery,
  useCreateUserClientMutation,
  useUpdateUserClientMutation,
  useResetPasswordClientMutation,
  useDeleteUserClientMutation,
  useApproveUserClientMutation,
} = UserClientApi;
