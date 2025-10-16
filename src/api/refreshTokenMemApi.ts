import mem from "memoize";
import { axios } from "./axiosCreate";
import { getCookie, saveCookie, saveLocal, getLocal } from "@/lib/helpers/cookie";
import { setAccessToken, setMenu } from "./memoryToken";
import { AxiosResponse } from "axios";

interface responseToken {
  memory: string;
  refresh: {
    refresh_token: string;
    expires_in: number;
  };
  menu: {
    legal: {
      id: string;
      no: number | null;
      name: string;
      url: string;
    }[];
    tax: {
      id: string;
      no: number | null;
      name: string;
      url: string;
    }[];
    accounting: {
      id: string;
      no: number | null;
      name: string;
      url: string;
    }[];
  };
  user: {
    email: string;
    id: string;
    role: string | string[];
    name: string;
    status: string;
    url_avatar: string | null;
  };
}

const refreshTokenFn = async () => {
  // const dispatch = useAppDispatch();
  const refreshToken = getLocal('pintardigi-consulting-refreshToken') || "";
  console.log("refreshToken", refreshToken);
  try {
    const response: AxiosResponse<responseToken> = await axios.post(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1/auth/refresh",
      null,
      {
        headers: {
          refreshtoken: refreshToken,
        },
      }
    );
    
    const { memory, refresh, user, menu } = response.data;
    if (!memory) {
      console.log("remove cookie");
      localStorage.removeItem('pintardigi-consulting-user');
      localStorage.removeItem('pintardigi-consulting-refreshToken');
      // Cookies.remove(generalLang.cookieRefreshToken);
    }
    console.log("response menu", menu);
    setAccessToken(memory);
    saveLocal('pintardigi-consulting-user', user);
    saveLocal('pintardigi-consulting-refreshToken', refresh.refresh_token);
    // saveCookie(generalLang.cookieRefreshToken, refresh.refresh_token, refresh.expires_in);
    // setMenu(menu);

    return response;
  } catch (error: any) {
    console.log("remove cookie");
    localStorage.removeItem('pintardigi-consulting-user');
    localStorage.removeItem('pintardigi-consulting-refreshToken');
    // Cookies.remove(generalLang.cookieRefreshToken);
    return error;
  }
};

const maxAge = 10000;

const refreshTokenMemApi = mem(refreshTokenFn, {
  maxAge,
});

export {refreshTokenMemApi} ;
