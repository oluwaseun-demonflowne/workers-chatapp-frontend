export type ListName = {
  email: string;
  message: string;
};

export type ListNameType = {
  [email: string]: { message: string; email: string };
};
