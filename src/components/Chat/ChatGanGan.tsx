"use client";
// import { Chat } from "@/app/dm/@chat/page";
import { MdCheck } from "react-icons/md";
import ImageChat from "./ImageChat";
import { type Chat } from "@/types/chatType";
import { useSocket } from "@/providers/Socket";
import { useChat } from "@/store";
import React, { type FC, useCallback, useEffect, useRef } from "react";

type Props = {
  chats: Chat[];
  email: string;
  senderEmail: string;
};

const ChatGanGan: FC<Props> = ({ chats, email, senderEmail }) => {
  const lastMessage = useRef<HTMLDivElement | null>(null);
  const { socket } = useSocket();
  const { statusChanged } = useChat();

  useEffect(() => {
    lastMessage?.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);
  //
  //
  //
  //
  //

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
      socket?.off("seen");
      socket?.off("reciever-seen");
      // socket?.off("now-seen-all");
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

  return (
    <div className="flex !w-full  h-full px-4 mt-4 chat-body flex-col gap-3 overflow-y-scroll">
      {chats.map((i, index) => {
        if (i.message === "") {
          return;
        }
        return (
          <div ref={lastMessage} key={index}>
            {i.senderEmail === senderEmail ? (
              <div
                ref={(ref) => {
                  observeMessage(ref, i.chatId);
                }}
                className="flex flex-col items-end">
                <div className="bg-[#007aff] flex flex-col gap-1  w-fit whitespace-pre-wrap break-words max-w-[60%]   text-white p-3 text-[13px]  rounded-l-md rounded-tr-md ">
                  <ImageChat chatsImage={i.image} />
                  <p className="">{i.message}</p>
                </div>
                {i.status == "delivered" && <MdCheck className="" />}
                {i.status == "delivered" && <MdCheck className="mt-[-12px] " />}
                {i.status == "read" && <MdCheck className="text-[#007aff]" />}
                {i.status == "read" && (
                  <MdCheck className="mt-[-12px] text-[#007aff]" />
                )}
              </div>
            ) : (
              <div
                ref={(ref) => {
                  observeMessage(ref, i.chatId);
                }}
                className="">
                <p className="text-slate-500 text-[12px] font-medium">
                  {email}
                </p>
                <div className="bg-[#f4f5f5] dark:bg-[#d7dadc] text-black p-3 text-[13px] w-fit whitespace-pre-wrap break-words max-w-[60%] rounded-r-md rounded-tl-md ">
                  <ImageChat chatsImage={i.image} />
                  <p className="">{i.message}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatGanGan;
