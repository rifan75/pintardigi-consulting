import Cookies from "js-cookie";
import { createHashId, decodeHashId } from "./hasher";

export const saveString = (key: string, value: string, age: number) => {
  let domain;
  const FE_URL = process.env.NEXT_PUBLIC_FE_BASE_URL;
  if (FE_URL) {
    domain = new URL(FE_URL);
  } else {
    // Handle the case when NEXT_PUBLIC_FE_BASE_URL is not defined
    console.error("NEXT_PUBLIC_FE_BASE_URL is not defined in the environment variables");
  }
  console.log("domain", domain?.hostname)
  console.log("key", value)
  const umur = Math.floor(age / (3600 * 24))
  console.log("age", age, umur)
  try {
    Cookies.set(key, value, {
      expires: Math.floor(age / (3600 * 24)),
      secure: true,
      domain: domain?.hostname,
    });
    return true;
  } catch (error) {
    console.error("error", error);
    return false;
  }
};

export const saveCookie = (key: string, value: string | object, age: number) =>
  saveString(key, JSON.stringify(value), age);

export const getCookie = (key: string) => {
  try {
    const itemString = Cookies.get(key);
    if (itemString) {
      return JSON.parse(itemString);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const saveLocal = (key: string, value: string | object) => {
  localStorage.setItem(key, createHashId(JSON.stringify(value)));
};

export const getLocal = (key: string) => {
  try {
    const itemString = localStorage.getItem(key);
    if (itemString) {
      return JSON.parse(decodeHashId(itemString));
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const cookieUtils = {
  saveString,
  saveCookie,
  getCookie,
  saveLocal,
  getLocal,
};

export default cookieUtils;
