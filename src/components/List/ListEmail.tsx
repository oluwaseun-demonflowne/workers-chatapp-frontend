"use client";
import { ListName } from "@/app/dm/@list/page";
import { useSocket } from "@/providers/Socket";
import { useEmailState, useSocketStateZustand } from "@/store";
import React, { useEffect} from "react";
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
  const config = genConfig("demon");
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
      {list.map((i, index) => (
        <div
          key={index}
          onClick={() => setEmail(i.email)}
          className="py-4 px-2  cursor-pointer hover:bg-[#e3dfdf] dark:hover:bg-slate-600  rounded-lg flex items-center gap-3"
        >
          <Avatar
            key={i.email}
            style={{ width: "2rem", height: "2rem" }}
            {...config}
          />
          <div className="w-full">
            <p className="text-[15px] flex justify-between  w-[100%] dark:text-[#d7dadc] font-semibold">
              {i.email}
              {getOnlineUsers.some(
                (onlineUser) => onlineUser.email === i.email
              ) ? (
                <span
                  key={index}
                  className=" p-1 h-fit mt-2 bg-green-700 rounded-[50%] text-green-700"
                ></span>
              ) : null}
            </p>
            <p className="text-[14px] text-slate-500 font-light">
              {getOnlineUsers.some(
                (onlineUser) =>
                  onlineUser.email === i.email && onlineUser.typing === true
              ) ? (
                <span key={index} className="animate-ping italic">
                  typing...
                </span>
              ) : (
                i.message
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListEmail;
