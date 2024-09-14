export type Data = {
  data: Chat;
};
export type Chat = {
  senderEmail: string;
  receiverEmail: string;
  chatId: number;
  message: string;
  image: string[];
  status: "sent" | "read" | "delivered";
};
