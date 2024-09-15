import { useChat, useEmailState } from "@/store";
import { type Chat } from "@/types/chatType";
import { type ListName, type ListNameType } from "@/types/listTypes";
import { useEffect, useState } from "react";

export const useList = () => {
  const [listName, setListName] = useState<ListName[]>([]);
  const { chats } = useChat();
  const { senderEmail } = useEmailState();
  const handleData = (names: Chat[]) => {
    const emailMap: ListNameType = {};

    names.forEach((item) => {
      const otherEmail =
        item.receiverEmail !== senderEmail
          ? item.receiverEmail
          : item.senderEmail;

      if (emailMap[otherEmail]) {
        // Update existing entry
        emailMap[otherEmail].message = item.message;
        emailMap[otherEmail].status =
          item.status ?? emailMap[otherEmail].status;
        emailMap[otherEmail].senderEmail = item.senderEmail;
      } else {
        // Create new entry
        emailMap[otherEmail] = {
          email: otherEmail,
          message: item.message,
          status: item.status ?? "unknown", // Provide a default value if status is undefined
          senderEmail: item.senderEmail
        };
      }
    });
    const unique = Object.values(emailMap) as ListName[];
    setListName(unique);
  };
  useEffect(() => {
    handleData(chats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderEmail, chats]);
  return { listName };
};
