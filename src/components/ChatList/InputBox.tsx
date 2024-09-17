"use client";
import { useSocket } from "@/providers/Socket";
import { useEmailState } from "@/store";
import React, { type FormEvent, useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import EmojiSelector from "./EmojiSelector";
import ImageChat from "./ImageChat";
import PreUpload from "./PreUpload";
import { emojis } from "@/templates/emoji";

const InputBox = () => {
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

  return (
    <form className="   p-4 " onSubmit={submitInput}>
      <PreUpload setArrayImages={setArrayImages} arrayImages={arrayImages} />
      <div className="flex mt-1 items-center gap-5">
        <input
          ref={textTypeRef}
          value={text}
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
          // onKeyDown={() => handleTyping()}
          className="px-3 h-11 max-h-40 min-h-11  dark:border-slate-400 dark:bg-slate-600 dark:text-[#d7dadc] outline-none py-2 border rounded-md overflow-hidden text-[13px] w-full"
          placeholder="iMessage"
        />
        <div className="flex gap-3 items-center">
          <button
            type="button"
            ref={emojiStarterRef}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
            className="cursor-pointer">
            {displayEmoji}
          </button>
          <ImageChat
            arrayImages={arrayImages}
            setArrayImages={setArrayImages}
          />

          {/* <button type="button">
            <MdOutlineBrowseGallery className="text-2xl text-slate-600" />
          </button> */}

          <button
            className={`${
              text.length < 1 ? "pointer-events-none opacity-30" : ""
            }`}>
            <MdSend className="text-2xl text-slate-600" />
          </button>
        </div>
      </div>

      <EmojiSelector
        emojiStarterRef={emojiStarterRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setter={setText}
      />
    </form>
  );
};

export default InputBox;
