type MyType = {
  legal: {
    id: string;
    no: number | null;
    name: string;
    url: string;
  }[];
  sales: {
    id: string;
    no: number | null;
    name: string;
    url: string;
  }[];
};

let accessToken = "";
let menu = {} as MyType;

export const setAccessToken = (s: string) => {
  accessToken = s;
};

export const setMenu = (o: MyType) => {
  menu = o;
};

export const getAccessToken = () => {
  return accessToken;
};

export const getMenu = () => {
  return menu;
};

export const isAuth = () => {
  // console.log('accessTokenMem =>', accessToken);
  if (accessToken) {
    return true;
  } else {
    return false;
  }
};
