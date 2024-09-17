"use client";
import { useSocket } from "@/providers/Socket";
import { useEmailState, useSocketStateZustand } from "@/store";
import { type ListName } from "@/types/listTypes";
import React, { useEffect } from "react";
import { MdCheck, MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";
import Avatar, { genConfig } from "react-nice-avatar";

type Props = {
  list: ListName[];
};

export type Online = {
  email: string;
  socketId: string;
  typing: boolean;
};

const ListEmail = ({ list }: Props) => {
  const { socket } = useSocket();
  // const [getOnlineUsers, setGetOnlineUsers] = useState<Online[]>([]);
  const { getOnlineUsers, setGetOnlineUsers } = useSocketStateZustand();
  // const [getOnlineUsers, setGetOnlineUsers] = useState<Online[]>([]);
  const { setEmail, senderEmail } = useEmailState();

  useEffect(() => {
    socket?.on("get-users", (user: Online[]) => {
      setGetOnlineUsers(user);
    });

    return () => {
      socket?.off("get-users");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderEmail, getOnlineUsers]);

  return (
    <div className="mt-5 remove-overflow h-[400px] overflow-y-scroll">
      {list.map((i, index) => {
        const config = genConfig(i.email);
        return (
          <div
            key={index}
            onClick={() => {
              setEmail(i.email);
            }}
            className="py-4 px-2  cursor-pointer hover:bg-[#e3dfdf] dark:hover:bg-slate-600  rounded-lg flex items-center gap-3">
            <Avatar
              key={i.email}
              style={{ width: "2rem", height: "2rem" }}
              {...config}
            />
            <div className="w-full">
              <p className="text-[15px] flex justify-between  w-[100%] dark:text-[#d7dadc] font-semibold">
                {i.email.length > 15
                  ? `${i.email.substring(0, 15)}...`
                  : i.email}
                {getOnlineUsers.some(
                  (onlineUser) => onlineUser.email === i.email
                ) ? (
                  <span
                    key={index}
                    className=" p-1 h-fit mt-2 bg-green-700 rounded-[50%] text-green-700"></span>
                ) : null}
              </p>
              <div className="text-[14px] text-slate-500 font-bold">
                {getOnlineUsers.some(
                  (onlineUser) =>
                    onlineUser.email === i.email && onlineUser.typing === true
                ) ? (
                  <span key={index} className="animate-ping italic">
                    typing...
                  </span>
                ) : // {i.status == "delivered" && <MdCheck className="" />}
                // {i.status == "delivered" && <MdCheck className="mt-[-12px] " />}
                // {i.status == "read" && <MdCheck className="text-[#007aff]" />}
                // {i.status == "read" && (
                //   <MdCheck className="mt-[-12px] text-[#007aff]" />
                // )}
                i.status === "read" ? (
                  <div className="flex gap-1 items-center">
                    <MdMarkEmailRead
                      className={`text-blue-500 ${
                        i.senderEmail === senderEmail ? "hidden" : "block"
                      } text-base`}
                    />
                    <p className="flex items-center">
                      <span
                        className={`${
                          i.senderEmail !== senderEmail ? "hidden" : "block"
                        }`}>
                        <MdCheck className="text-[#007aff] text-base" />
                        <MdCheck className="mt-[-12px] text-[#007aff] text-base" />
                      </span>
                      {i.message}
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-1 items-center">
                    <MdMarkEmailUnread
                      className={`text-red-600 ${
                        i.senderEmail === senderEmail ? "hidden" : "block"
                      } text-base`}
                    />
                    <p className="flex items-center">
                      <span
                        className={`${
                          i.senderEmail !== senderEmail ? "hidden" : "block"
                        }`}>
                        <MdCheck className="text-base" />
                        <MdCheck className="mt-[-12px] text-base" />
                      </span>
                      {i.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListEmail;
