// import { baseApi, baseAxios } from "./axios";
import { baseApi } from "../baseApi";

export interface LoginRequestBody {
  email: string;
  password: string;
  state: string;
  challenge: string;
}

export interface AuthorizeRequestBody {
  code: string;
  verifier: string;
}

const loginConsultantApi = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      loginConsultant: build.mutation({
        query: (data: LoginRequestBody) => ({
          url: "/api/v1/auth/consultant-login",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
          },
          data: { email: data.email, password: data.password, state: data.state, challenge: data.challenge },
        }),
      }),
      authorizeConsultant: build.mutation({
        query: (data: AuthorizeRequestBody) => ({
          url: "/api/v1/auth/consultant-authorize",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
          },
          data: {
            code: data.code,
            verifier: data.verifier,
          },
        }),
      }),
      registerConsultant: build.mutation({
        query: (data: { name: string; email: string; role: string; password: string; confirmPassword: string }) => ({
          url: "/api/v1/consultant-register",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
          },
          data: {
            name: data.name,
            email: data.email,
            role: data.role,
            password: data.password,
            password_confirm: data.confirmPassword,
          },
        }),
      }),
    };
  },
});

export const { useLoginConsultantMutation, useAuthorizeConsultantMutation, useRegisterConsultantMutation } = loginConsultantApi;
