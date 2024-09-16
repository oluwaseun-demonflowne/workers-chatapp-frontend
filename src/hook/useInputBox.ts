import { useSocket } from "@/providers/Socket";
import { useEmailState } from "@/store";
import { emojis } from "@/templates/emoji";
import { type FormEvent, useEffect, useRef, useState } from "react";

export const useInputBoxHook = () => {
  const [text, setText] = useState("");
  const [displayEmoji, _setDisplayEmoji] = useState<string>(emojis[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [arrayImages, setArrayImages] = useState<string[]>([]);
  const { email, senderEmail } = useEmailState();
  // const [loading, setLoading] = useState(false);
  const { socket } = useSocket();
  const emojiStarterRef = useRef<HTMLButtonElement | null>(null);

  const textTypeRef = useRef<HTMLInputElement | null>(null);

  // console.log(arrayImages);

  const submitInput = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket?.emit("sentMessage", {
      chatId: Math.floor(Math.random() * 1000000),
      message: text,
      senderEmail: senderEmail,
      receiverEmail: email,
      image: arrayImages,
      status: "sent"
      // date: "Today 7:45 am",
      // picture: session?.user?.image,
    });
    setText("");
    setArrayImages([]);
  };

  useEffect(() => {
    let activityTimer: NodeJS.Timeout;
    const handleTyping = () => {
      socket?.emit("typing", senderEmail);
      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        socket?.emit("stop-typing", senderEmail);
      }, 2000);
    };

    textTypeRef?.current?.addEventListener("keypress", handleTyping);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      textTypeRef?.current?.removeEventListener("keypress", handleTyping);
      socket?.off("typing");
      socket?.off("stop-typing");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    text,
    displayEmoji,
    isOpen,
    setIsOpen,
    emojiStarterRef,
    submitInput,
    arrayImages,
    setArrayImages,
    setText,
    textTypeRef
  };
};
