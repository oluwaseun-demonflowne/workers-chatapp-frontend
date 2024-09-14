"use client";
import ListEmail from "@/components/List/ListEmail";
import SearchBar from "@/components/List/SearchBar";
import { useSocket } from "@/providers/Socket";
import { useChat, useEmailState } from "@/store";
import { names } from "@/templates/chat";
import { type Chat } from "@/types/chatType";
import { type ListName, type ListNameType } from "@/types/listTypes";
import React, { type FC, Suspense, useEffect, useState } from "react";

const List: FC<Record<string, never>> = () => {
  const [listName, setListName] = useState<ListName[]>([]);
  const { chats } = useChat();
  const {socket} = useSocket()
  const { senderEmail } = useEmailState();

  const handleData = (names: Chat[]) => {
    const emailMap: ListNameType = {};

    console.log("e dey work")

    names.forEach((item) => {
      if (item.receiverEmail !== senderEmail) {
        console.log(item.message)
        if (emailMap[item.receiverEmail]) {
          emailMap[item.receiverEmail].message = item.message;
        } else
          [
            (emailMap[item.receiverEmail] = {
              email: item.receiverEmail,
              message: item.message,
            }),
          ];
      }
    });
    const unique = Object.values(emailMap) as ListName[];
    setListName(unique);
  };

  useEffect(() => {
    handleData(chats);
    // handleData(names);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderEmail, chats]);

  return (
    <div className="bg-[#f0ebec] dark:bg-[#202020] rounded-l-2xl overflow-hidden shadow-lg h-[80vh] w-[360px] p-5">
      <SearchBar />
      <Suspense fallback={<p>hello</p>}>
        <ListEmail list={listName} />
      </Suspense>
    </div>
  );
};

export default List;
