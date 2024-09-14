import { getCode } from "@/fetch/GetCode";
import { useSocket } from "@/providers/Socket";
import { useEmailState, useSocketStateZustand } from "@/store";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, {
  type Dispatch,
  type SetStateAction,
  useRef,
  useState,
} from "react";
import { AiOutlineRedo } from "react-icons/ai";
import { Online } from "../List/ListEmail";

type Props = {
  openVerifyModel: boolean;
  chatter: string;
  setOpenVerifyModel: Dispatch<SetStateAction<boolean>>;
};

const mobileVariants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
    y: 0,
  },
  closed: { opacity: 0, transition: { duration: 0.4 }, y: "-700px" },
};

const VerifyEmail = ({
  openVerifyModel,
  chatter,
  setOpenVerifyModel,
}: Props) => {
  const { push } = useRouter();
  const { socket } = useSocket();
  const { setGetOnlineUsers } = useSocketStateZustand();
  const { setSenderEmail } = useEmailState();
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState({ error: false, errorMsg: "" });
  const [loading, setLoading] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const refs = useRef<HTMLInputElement[]>([]);
  const handleChangeText = (text: string, index: number) => {
    // Ensure only numeric characters are entered
    if (/^\d+$/.test(text) || text === "") {
      const newCodes = [...codes];
      newCodes[index] = text;
      setCodes(newCodes);

      // Move focus to the next input
      if (text !== "" && index < codes.length - 1) {
        refs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // If the backspace key is pressed and the input is empty, move focus to the previous input
    if (e.key === "Backspace" && codes[index] === "" && index > 0) {
      refs.current[index - 1].focus();
    }
  };
  return (
    <motion.div
      className={`top-0 ${
        openVerifyModel ? "z-10 " : "z-[-4] opacity-0"
      }  right-0 flex justify-center h-screen w-[100%] absolute`}
    >
      <motion.div
        animate={openVerifyModel ? "open" : "closed"}
        variants={mobileVariants}
        className="bg-white dark:bg-[#202020] mt-5 rounded-2xl shadow-xl h-fit overflow-hidden w-[450px] text-center flex flex-col  justify-between"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
              const response = await fetch("/api/VerifyToken", {
                method: "POST",
                body: JSON.stringify({
                  email: chatter,
                }),
                headers: { otpToken: codes.join("") },
              });
              if (response.status === 200) {
                socket?.emit("new-online", chatter);
                // setSenderEmail(chatter);
                setSenderEmail(chatter);
                socket &&
                  socket?.on("get-users", (user: Online[]) => {
                    setGetOnlineUsers(user);
                  });
                push("/dm");
              }
              if (response.status === 500) {
                setLoading(false);
              }
              if (response.status === 401) {
                // incorrect key , please retry
                setError({
                  error: true,
                  errorMsg: "incorrect key , please retry",
                });
                setLoading(false);
              }
              if (response.status === 402) {
                setDisableInput(true);
                setError({
                  error: true,
                  errorMsg: "Token expired, please request new token",
                });
                setLoading(false);
              }
              console.log(response.json());

              // setOpenVerifyModal(true);
            } catch (error) {
              console.log(error);
              setLoading(false);
            }
          }}
          className="mt-6 "
        >
          <p className="text-[22px] dark:text-[#d7dadc] text-gray-600 font-medium">
            Verify your email address to start conversations.
          </p>
          <p className="text-[13px] mt-4 dark:text-[#d7dadc] text-gray-500 font-light">
            An email with a verification code has been sent to{" "}
            <span className="semibold">{chatter} Enter the code below</span>
          </p>
          <div>
            <div>
              <div className="flex gap-1 flex-row mt-5 justify-center items-center">
                {codes.map((code, index) => (
                  <input
                    required
                    className={`text-sm ${
                      disableInput ? "pointer-events-none opacity-20" : ""
                    } rounded-md dark:bg-slate-600 dark:text-[#d7dadc] outline-[#007aff] w-8 border h-8 p-2 border-slate-400 dark:border-slate-400 `}
                    key={index}
                    // @ts-expect-error skill issues ejeh
                    // damn
                    ref={(input) => (refs.current[index] = input)}
                    value={code}
                    onChange={(e) => {
                      handleChangeText(e.currentTarget.value, index);
                    }}
                    onKeyUp={(e) => {
                      handleKeyPress(e, index);
                    }}
                    type="text"
                    maxLength={1}
                  />
                ))}
              </div>
              <p className="text-[14px] text-red-700">
                {error.error ? error.errorMsg : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={async () => {
                setDisableInput(true);
                await getCode(setLoading, chatter);
                setDisableInput(false);
                setLoading(false);
              }}
              disabled={loading}
              className={`text-[13px] text-[#304fff] ${
                loading ? "opacity-30" : ""
              } text-center mt-5 font-light`}
            >
              Didn&apos;t get a code? Request new code
              {/* <span className="text-[#304fff]"></span> */}
            </button>
            <div className="bg-[#e3dfdf] dark:bg-[#202020]  dark:border-slate-600 px-4 mt-6 border-t border-slate-300 flex justify-between py-3">
              <motion.button
                onClick={() => {
                  setOpenVerifyModel(false);
                }}
                type="button"
                disabled={loading}
                initial={{ backgroundColor: "transparent" }}
                // variants={hoverVariant}
                whileHover="hover"
                className={`px-4 ${
                  loading ? "opacity-30" : ""
                } flex gap-1 dark:border-slate-500 items-center text-center py-2 text-[#304fff] border border-slate-300  rounded-md font-light  text-[14px] bg-white`}
              >
                <AiOutlineRedo />
                wrong email?
              </motion.button>
              <button
                disabled={loading}
                className={`w-36 button-57 ${
                  loading ? "opacity-30" : ""
                } py-2 border border-slate-300 dark:border-slate-500 dark:text-[#d7dadc]  rounded-md font-light text-[#304fff] text-[14px] dark:bg-slate-600 bg-white`}
              >
                <span>Verify</span>
                <span>Verify</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default VerifyEmail;
