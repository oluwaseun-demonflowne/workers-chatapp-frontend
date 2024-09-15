import { useSocket } from "@/providers/Socket";
import { useChat } from "@/store";
import { type Chat } from "@/types/chatType";
import { useCallback, useEffect, useRef } from "react";

export const useRecieveMessage = (
  chats: Chat[],
  email: string,
  senderEmail: string
) => {
  const lastMessage = useRef<HTMLDivElement | null>(null);
  const { socket } = useSocket();
  const { statusChanged } = useChat();

  useEffect(() => {
    lastMessage?.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  useEffect(() => {
    socket?.on("seen", (receiver: string) => {
      if (receiver === senderEmail) {
        //  this would now make the senderEmail the person recieving incase i am confused later on because this code only runs to the person who recieved
        // console.log("receiver", email, "sender", senderEmail);
        socket?.emit("reciever-seen", {
          receiverEmail: email,
          senderEmail
        });
      }
    });
    socket?.on("now-seen-all", (receiverEmail: { senderEmails: string }) => {
      statusChanged(receiverEmail.senderEmails);
    });
    return () => {
      socket?.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const observeMessage = useCallback(
    (messageRef: HTMLDivElement | null, id: number) => {
      if (messageRef) {
        if (chats[chats.length - 1].chatId === id) {
          if (chats[chats.length - 1].status === "read") {
            return;
          }
          socket?.emit("all-is-seen", {
            receiver: chats[chats.length - 1].receiverEmail,
            id
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chats]
  );
  return { lastMessage, observeMessage };
};
