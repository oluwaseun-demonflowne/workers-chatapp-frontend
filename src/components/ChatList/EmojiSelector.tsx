import { emojis } from "@/templates/emoji";
import React, {
  useEffect,
  type Dispatch,
  type SetStateAction,
  type MutableRefObject,
  useRef
} from "react";
import { motion } from "framer-motion";

type Props = {
  setter: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  emojiStarterRef: MutableRefObject<HTMLButtonElement | null>;
};

const mobileVariants = {
  open: {
    height: 160,
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 200,
      damping: 23
    },
    y: 0
  },
  closed: { opacity: 0, transition: { duration: 0.4 }, y: "700px", height: 0 }
};

export default function EmojiSelector(props: Props) {
  const { setter, emojiStarterRef, isOpen, setIsOpen } = props;
  const emojiRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!emojiRef?.current?.contains(e.target as Node)) {
        if (!emojiStarterRef?.current?.contains(e.target as Node)) {
          setIsOpen(false);
        }

        //
        // isOpen &&
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emojiRef]);

  const handleClick = (emoji: string) => {
    // setIsOpen(false);
    setter((old) => old + `${emoji}`);
  };

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      variants={mobileVariants}
      className="">
      {/* <div className="">{displayEmoji}</div> */}
      <div
        ref={emojiRef}
        className={` ${
          isOpen ? "h-40" : "h-0"
        } mt-3 remove-overflow overflow-y-scroll`}>
        {emojis.map((emoji, index) => (
          <button
            type="button"
            key={index}
            className="text-2xl"
            onClick={() => {
              handleClick(emoji);
            }}>
            {emoji}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
