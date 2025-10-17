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

const loginClientApi = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      loginClient: build.mutation({
        query: (data: LoginRequestBody) => ({
          url: "/api/v1/auth/client-login",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
          },
          data: { email: data.email, password: data.password, state: data.state, challenge: data.challenge },
        }),
      }),
      authorizeClient: build.mutation({
        query: (data: AuthorizeRequestBody) => ({
          url: "/api/v1/auth/client-authorize",
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
      registerClient: build.mutation({
        query: (data: { name: string; email: string; role: string; password: string; confirmPassword: string }) => ({
          url: "/api/v1/client-register",
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

export const { useLoginClientMutation, useAuthorizeClientMutation, useRegisterClientMutation } = loginClientApi;
