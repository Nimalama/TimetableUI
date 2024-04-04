//eslint-disable-next-line
export interface ObjectKeysInterface<T = any> {
  [key: string]: T;
}

export interface GoogleAuthResponseInterface {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}
