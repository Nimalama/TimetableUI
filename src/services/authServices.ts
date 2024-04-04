import { getApiData } from "../utility/httpHelper";

export interface AuthCodeInterface {
  code: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

export interface GoogleAuthResponseInterface {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export const getTokenResponseFromGoogleAuthCode = async (
  data: AuthCodeInterface
): Promise<GoogleAuthResponseInterface> => {
  const response = await getApiData<GoogleAuthResponseInterface>({
    baseURL: "https://oauth2.googleapis.com/token",
    endPoint: "",
    method: "POST",
    data: data,
    additionalHeaders: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  });

  return response;
};
