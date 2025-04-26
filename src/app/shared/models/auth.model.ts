export interface LoginRequest {
  user: string;
  password: string;
}

export interface LoginResponseData {
  accessToken: string;
  user: {
    id: string | number;
    name: string;
    email: string;
    roles?: string[];
    permissions?: string[];
  };
  default: {
    codSede: string;
    desSede: string;
    idModulo: string;
    codModulo: string;
    desModulo: string;
    defaultRoute: string;
  };
}
