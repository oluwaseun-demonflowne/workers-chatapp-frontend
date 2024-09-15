"use client";
import React from "react";
import { MdSend } from "react-icons/md";
import EmojiSelector from "./EmojiSelector";
import ImageChat from "./ImageChat";
import PreUpload from "./PreUpload";
import { useInputBoxHook } from "@/hook/useInputBox";

const InputBox = () => {
  const {
    displayEmoji,
    emojiStarterRef,
    isOpen,
    setIsOpen,
    submitInput,
    text,
    arrayImages,
    setArrayImages,
    setText,
    textTypeRef
  } = useInputBoxHook();

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
