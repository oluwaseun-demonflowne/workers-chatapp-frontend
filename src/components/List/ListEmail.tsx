"use client";
import { useSocket } from "@/providers/Socket";
import { useEmailState, useSocketStateZustand } from "@/store";
import { type ListName } from "@/types/listTypes";
import React, { type Dispatch, type SetStateAction, useEffect } from "react";
import { MdCheck, MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";
import Avatar, { genConfig } from "react-nice-avatar";

type Props = {
  list: ListName[];
  openSearch: boolean;
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
};

export type Online = {
  email: string;
  socketId: string;
  typing: boolean;
};

const ListEmail = ({ list, openSearch, setOpenSearch }: Props) => {
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
    <div className={`${openSearch ? "mt-8" : "mt-16"} md:pt-0 md:mt-5 remove-overflow h-[400px] overflow-y-scroll`}>
      {list.map((i, index) => {
        const config = genConfig(i.email);
        return (
          <div
            key={index}
            onClick={() => {
              setEmail(i.email);
              setOpenSearch(false);
            }}
            className={`  md:py-4 md:px-2  ${openSearch ? "mt-5" : "mt-0"} md:mt-0 border cursor-pointer md:hover:bg-[#e3dfdf] md:dark:hover:bg-slate-600  rounded-lg flex items-center gap-3`}>
            <div className="flex">
              <Avatar
                key={i.email}
                style={{ width: "2rem", height: "2rem" }}
                {...config}
              />
              <div className="flex flex-col ">
                {getOnlineUsers.some(
                  (onlineUser) => onlineUser.email === i.email
                ) ? (
                  <span
                    key={index}
                    className=" p-1 mt-[-6px] md:hidden h-fit w-fit  bg-green-700 rounded-[50%] text-green-700"></span>
                ) : (
                  <span
                    key={index}
                    className=" p-1 mt-[-6px] md:hidden h-fit w-fit bg-red-500 rounded-[50%] text-green-700"></span>
                )}
                <div
                  className={`mt-[19px] ${openSearch ? "hidden" : ""} md:hidden`}>
                  {i.status === "read" ? (
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
                        {/* {i.message.length > 15
                        ? `${i.message.substring(0, 15)}...`
                        : i.message} */}
                      </p>
                    </div>
                  ) : i.status === "delivered" ? (
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
                        {/* {i.message} */}
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
                          <MdCheck className=" text-base" />
                        </span>
                        {/* {i.message} */}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full  md:block">
              <p className="text-[15px] flex justify-between  w-[100%] dark:text-[#d7dadc] font-semibold">
                {i.email.length > 15
                  ? `${i.email.substring(0, 15)}...`
                  : i.email}
                {getOnlineUsers.some(
                  (onlineUser) => onlineUser.email === i.email
                ) ? (
                  <span
                    key={index}
                    className=" p-1 h-fit hidden md:flex mt-2 bg-green-700 rounded-[50%] text-green-700"></span>
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
                      {i.message.length > 15
                        ? `${i.message.substring(0, 15)}...`
                        : i.message}
                    </p>
                  </div>
                ) : i.status === "delivered" ? (
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
                      {i.message.length > 15
                        ? `${i.message.substring(0, 15)}...`
                        : i.message}
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
                        <MdCheck className=" text-base" />
                      </span>
                      {i.message.length > 15
                        ? `${i.message.substring(0, 15)}...`
                        : i.message}
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
