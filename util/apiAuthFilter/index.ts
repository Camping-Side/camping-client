import account from "./account";
import auth from "./auth";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const apiUrlList: string[] = [...account, ...auth];

export const isRequireAuth = (fullUrl: string | undefined) => {
  const apiUrl = fullUrl?.replace(BASE_URL, "") || "";
  return !apiUrlList.includes(apiUrl);
};
