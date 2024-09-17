export type ListName = {
  email: string;
  message: string;
  status: string;
  senderEmail: string;
};

export type ListNameType = {
  [email: string]: {
    message: string;
    email: string;
    status: string;
    senderEmail: string;
  };
};
