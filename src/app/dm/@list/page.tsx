"use client";
import ListEmail from "@/components/List/ListEmail";
import SearchBar from "@/components/List/SearchBar";
import { useChat, useEmailState } from "@/store";
import { type Chat } from "@/types/chatType";
import { type ListName, type ListNameType } from "@/types/listTypes";
import React, { type FC, Suspense, useEffect, useState } from "react";

const List: FC<Record<string, never>> = () => {
  const [listName, setListName] = useState<ListName[]>([]);
  const { chats } = useChat();
  const { senderEmail } = useEmailState();

  console.log(chats);

  const handleData = (names: Chat[]) => {
    console.log(chats);
    console.log("is this actually working");
    const emailMap: ListNameType = {};

    names.forEach((item) => {
      console.log(item.receiverEmail, senderEmail);
      if (item.receiverEmail !== senderEmail) {
        console.log(item.message);
        if (emailMap[item.receiverEmail]) {
          emailMap[item.receiverEmail].message = item.message;
        } else
          [
            (emailMap[item.receiverEmail] = {
              email: item.receiverEmail,
              message: item.message
            })
          ];
      } else {
        if (emailMap[item.senderEmail]) {
          emailMap[item.senderEmail].message = item.message;
        } else
          [
            (emailMap[item.senderEmail] = {
              email: item.senderEmail,
              message: item.message
            })
          ];
      }
    });
    const unique = Object.values(emailMap) as ListName[];
    setListName(unique);
    console.log(unique);
  };

  console.log(listName);

  useEffect(() => {
    handleData(chats);
    console.log(senderEmail);
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
