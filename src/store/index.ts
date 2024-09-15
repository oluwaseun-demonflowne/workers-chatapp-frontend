/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { type Online } from "@/components/List/ListEmail";
import { type Chat } from "@/types/chatType";
import { create } from "zustand";

type EmailStates = {
  senderEmail: string;
  email: string;
};
type ChatStore = {
  chats: Chat[];
  tempChat: Chat[];
};
// type TextList = {
//   list: ListName[];
// };

// type TextListAction = {
//   setList: (list: ListName) => void;
// };

type ChatStoreAction = {
  setChats: (chat: Chat) => void;
  resetChat: () => void;
  filteredChat: (chat: Chat[]) => void;
  statusChanged: (email: string) => void;
};

type SocketState = {
  getOnlineUsers: Online[];
};
type SocketStateAction = {
  setGetOnlineUsers: (array: Online[]) => void;
};

type Action = {
  setEmail: (email: string) => void;
  setSenderEmail: (email: string) => void;
};

export const useEmailState = create<EmailStates & Action>((set) => ({
  senderEmail: "",
  email: "",
  setEmail: (emails) => set(() => ({ email: emails })),
  setSenderEmail: (emails) => set(() => ({ senderEmail: emails }))
}));
export const useChat = create<ChatStore & ChatStoreAction>((set) => ({
  chats: [],
  tempChat: [],
  setChats: (theChat: Chat) =>
    set((state) => ({ chats: [...state.chats, theChat] })),
  resetChat: () => set(() => ({ tempChat: [] })),
  filteredChat: (filtered: Chat[]) => set(() => ({ tempChat: filtered })),
  statusChanged: (email: string) =>
    set((state) => ({
      chats: state.chats.map((i) => {
        if (i.senderEmail === email || i.receiverEmail === email) {
          return { ...i, status: "read" };
        } else {
          return { ...i };
        }
      })
    }))
}));

export const useSocketStateZustand = create<SocketState & SocketStateAction>(
  (set) => ({
    getOnlineUsers: [],
    setGetOnlineUsers: (onlineUsers) =>
      set(() => ({ getOnlineUsers: onlineUsers }))
  })
);

// export const useListOfChat = create<TextList & TextListAction>((set) => ({
//   list: [],
//   setList: () => ({list:}),
// }));

// const handleData = (names: Chat[]) => {
//   const emailMap: ListNameType = {};

//   names.forEach((item) => {
//     if (item.receiverEmail !== senderEmail) {
//       if (emailMap[item.receiverEmail]) {
//         emailMap[item.receiverEmail].message = item.message;
//       } else
//         [
//           (emailMap[item.receiverEmail] = {
//             email: item.receiverEmail,
//             message: item.message,
//           }),
//         ];
//     }
//   });
//   const unique = Object.values(emailMap) as ListName[];
//   setListName(unique);
// };
