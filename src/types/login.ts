export interface FormProps {
  email: string;
  password: string;
}

export interface LoginRes {
  result: {
    profile: {
      email: string;
      roles: string[];
      id: string;
      name: string;
      status: string;
    };
    access_token: string;
  };
}
