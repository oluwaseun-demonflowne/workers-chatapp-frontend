import { useChat, useEmailState } from "@/store";
import { type Chat } from "@/types/chatType";
import React, { type Dispatch, type SetStateAction, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdSms } from "react-icons/md";
import { toast } from "sonner";

type Props = {
  openSearch: boolean;
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
};

// export type Chat = {
//   senderEmail: string;
//   receiverEmail: string;
//   chatId: number;
//   message: string;
//   image: string[];
//   status: "sent" | "read" | "delivered";
// };

// socket?.emit("sentMessage", {
//   chatId: Math.floor(Math.random() * 1000000),
//   message: text,
//   senderEmail: senderEmail,
//   receiverEmail: email,
//   image: arrayImages,
//   status: "sent",
//   // date: "Today 7:45 am",
//   // picture: session?.user?.image,
// });
const SearchBar = ({ openSearch, setOpenSearch }: Props) => {
  const { senderEmail, setEmail } = useEmailState();
  const { setChats } = useChat();

  const [searchEmail, setSearchEmail] = useState<Chat>({
    senderEmail: senderEmail,
    receiverEmail: "",
    chatId: Math.floor(Math.random() * 1000000),
    message: "",
    image: [],
    status: "sent"
  });

  const addEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (senderEmail === searchEmail.receiverEmail) {
      toast.error("Can't text yourself");
      setSearchEmail({
        senderEmail: senderEmail,
        receiverEmail: "",
        chatId: Math.floor(Math.random() * 1000000),
        message: "",
        image: [],
        status: "sent"
      });
      return;
    }
    setChats(searchEmail);
    setSearchEmail({
      senderEmail: senderEmail,
      receiverEmail: "",
      chatId: Math.floor(Math.random() * 1000000),
      message: "",
      image: [],
      status: "sent"
    });
    setOpenSearch(false);
  };

  return (
    <form
      onSubmit={addEmail}
      className="relative  flex justify-between items-center">
      <input
        required
        value={searchEmail.receiverEmail}
        onChange={(e) => {
          setSearchEmail((prev) => ({
            ...prev,
            senderEmail: senderEmail,
            receiverEmail: e.target.value
          }));
        }}
        placeholder="search"
        className={`bg-[#e3dfdf] ${openSearch ? "flex" : "hidden md:flex"}  dark:border-slate-400 dark:bg-slate-600 dark:text-[#d7dadc] rounded-md pl-9 text-slate-800 border border-slate-400 p-2 md:text-[15px] text-lg w-72 outline-none `}
        type="email"
      />
      <FaSearch
        onClick={() => {
          setOpenSearch(true);
          setEmail("");
        }}
        className="absolute md:pointer-events-none top-3 left-2 text-slate-400"
      />
      <button className={`${openSearch ? "flex" : "hidden md:flex"} md:flex`}>
        <MdSms className="text-4xl  md:text-2xl ml-2" />
      </button>
    </form>
  );
};

export default SearchBar;
