"use client";
import ChatGanGan from "@/components/Chat/ChatGanGan";
import NoEmail from "@/components/Chat/NoEmail";
import WhoWeText from "@/components/Chat/WhoWeText";
import InputBox from "@/components/ChatList/InputBox";
import { useSocket } from "@/providers/Socket";
import { useChat, useEmailState } from "@/store";
import { type Data } from "@/types/chatType";
import React, { type FC, useEffect } from "react";

const Chat: FC<Record<string, never>> = () => {
  const { email, senderEmail, setEmail } = useEmailState((state) => state);
  const { chats, setChats, filteredChat, resetChat, tempChat } = useChat();
  const { socket } = useSocket();

  useEffect(() => {
    socket?.on("sentMessageFromServer", (data: Data) => {
      setChats(data.data);
      // filterSharp();
      // setChats((prev) => [...prev, data.data]);
    });

    return () => {
      socket?.off("sentMessageFromServer");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const result = chats.filter(
      (i) => i.senderEmail === email || i.receiverEmail === email
    );
    if (result?.length === 0) {
      // setChatHere([]);
      resetChat();
    } else {
      // setChatHere(result);
      filteredChat(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, chats]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEmail("");
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {email === "" ? (
        <NoEmail />
      ) : (
        <div className="bg-white dark:bg-[#202020] h-[80vh] rounded-r-2xl overflow-hidden shadow-lg  flex flex-col justify-between dark:border-slate-700 border w-[500px]">
          <WhoWeText email={email} />
          <ChatGanGan
            chats={tempChat}
            senderEmail={senderEmail}
            email={email}
          />
          <InputBox />
        </div>
      )}
    </>
  );
};

export default Chat;
