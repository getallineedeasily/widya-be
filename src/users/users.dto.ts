export type CreateUserRequestDto = {
  name: string;
  email: string;
  password: string;
};

export type LoginUserRequestDto = {
  email: string;
  password: string;
};
