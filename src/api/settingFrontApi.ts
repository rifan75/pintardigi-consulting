import { ApiResponse, ApiResponseWithPagination } from "@/interfaces/api-response";
import { ISettingFront } from "@/interfaces/setting";
import { baseApi } from "./baseApi";


export const SettingFrontApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["settingFrontList"] })
  .injectEndpoints({
    endpoints(build) {
      return {
        getSettingFront: build.query<ApiResponse<ISettingFront>, {domain:string}>({
          query: (arg) => ({
            url: `/api/setting-front?domain=${arg.domain}`,
            method: "GET",
          }),
          providesTags: ["settingFrontList"],
        }),
      };
    },
  });

export const {
  useGetSettingFrontQuery,
} = SettingFrontApi;
