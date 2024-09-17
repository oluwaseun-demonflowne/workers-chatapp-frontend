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


  const handleData = (names: Chat[]) => {
    const emailMap: ListNameType = {};

    names.forEach((item) => {
      // if (item.receiverEmail !== senderEmail) {
      //   console.log(item.message);
      //   if (emailMap[item.receiverEmail]) {
      //     emailMap[item.receiverEmail].message = item.message;
      //     emailMap[item.receiverEmail].status = item.status;
      //     emailMap[item.receiverEmail].senderEmail = item.senderEmail;
      //   } else
      //     [
      //       (emailMap[item.receiverEmail] = {
      //         email: item.receiverEmail,
      //         message: item.message,status: item.status ?? "unknown", // Provide a default value if status is undefined
      //         senderEmail: item.senderEmail
      //       })
      //     ];
      // } else {
      //   if (emailMap[item.senderEmail]) {
      //     emailMap[item.senderEmail].message = item.message;
      //     emailMap[item.senderEmail].status = item.status;
      //     emailMap[item.senderEmail].senderEmail = item.senderEmail;
      //   } else
      //     [
      //       (emailMap[item.senderEmail] = {
      //         email: item.senderEmail,
      //         message: item.message,
      //         status: item.status ?? "unknown", // Provide a default value if status is undefined
      //         senderEmail: item.senderEmail
      //       })
      //     ];
      // }
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
    console.log(unique);
  };


  useEffect(() => {
    handleData(chats);
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
