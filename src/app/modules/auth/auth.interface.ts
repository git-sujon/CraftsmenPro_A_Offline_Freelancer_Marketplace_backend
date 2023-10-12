export interface ILogin {
    email:string,
    password:string
}


export type ILoginUserResponse = {
    accessToken: string;
    refreshToken?: string;
  };