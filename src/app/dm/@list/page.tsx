"use client";
import ListEmail from "@/components/List/ListEmail";
import SearchBar from "@/components/List/SearchBar";
import { useChat, useEmailState } from "@/store";
import { type Chat } from "@/types/chatType";
import { type ListName, type ListNameType } from "@/types/listTypes";
import React, { type FC, Suspense, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

const List: FC<Record<string, never>> = () => {
  const [listName, setListName] = useState<ListName[]>([]);
  const [openSearch, setOpenSearch] = useState(false);
  const { chats } = useChat();
  const { senderEmail } = useEmailState();

  const handleData = (names: Chat[]) => {
    const emailMap: ListNameType = {};

    names.forEach((item) => {
      // if (item.receiverEmail !== senderEmail) {
      //
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
  };

  useEffect(() => {
    handleData(chats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderEmail, chats]);

  return (
    <div
      className={`bg-[#f0ebec] dark:bg-[#202020] rounded-l-2xl overflow-hidden shadow-lg h-[80vh] ${openSearch ? "w-[100%] absolute" : ""} md:w-[360px] p-3 md:py-5 md:px-5`}>
      <div className="flex items-center justify-between">
        <SearchBar openSearch={openSearch} setOpenSearch={setOpenSearch} />
        <MdCancel
          onClick={() => {
            setOpenSearch(false);
          }}
          className={`text-3xl ${openSearch ? "flex" : "hidden"} text-red-700 items-center`}
        />
      </div>
      <div className={`${openSearch ? "w-[100%] absolute" : "w-[55px]"}`}>
        <Suspense fallback={<p>hello</p>}>
          <ListEmail
            setOpenSearch={setOpenSearch}
            openSearch={openSearch}
            list={listName}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default List;
