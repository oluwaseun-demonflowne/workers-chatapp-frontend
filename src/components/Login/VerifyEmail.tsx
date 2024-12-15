import { getCode } from "@/fetch/GetCode";
import { motion } from "framer-motion";
import React, { type Dispatch, type SetStateAction } from "react";
import { AiOutlineRedo } from "react-icons/ai";
import { useVerifyToken } from "@/hook/useVerifyToken";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
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
      damping: 15
    },
    y: 0
  },
  closed: { opacity: 0, transition: { duration: 0.4 }, y: "-700px" }
};

const VerifyEmail = ({
  openVerifyModel,
  chatter,
  setOpenVerifyModel
}: Props) => {
  const { login, value, setValue, loading, setLoading, error } =
    useVerifyToken(chatter);
  return (
    <motion.div
      className={`top-0 ${
        openVerifyModel ? "z-10 " : "z-[-4] opacity-0"
      }  right-0 flex justify-center h-screen w-[100%] absolute`}>
      <motion.div
        animate={openVerifyModel ? "open" : "closed"}
        variants={mobileVariants}
        className="bg-white dark:bg-[#202020] mt-5 rounded-2xl shadow-xl h-fit overflow-hidden w-[450px] text-center flex flex-col  justify-between">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            login();
          }}
          className="mt-6 ">
          <p className="text-[22px] dark:text-[#d7dadc] text-gray-600 font-medium">
            Verify your email address to start conversations.
          </p>
          <p className="text-[15px] md:text-[13px] mt-4 dark:text-[#d7dadc] text-gray-500 font-light">
            An email with a verification code has been sent to{" "}
            <span className="semibold">{chatter} Enter the code below</span>
          </p>
          <div>
            <div className="flex justify-center">
              <InputOTP
                value={value}
                onChange={(value) => {
                  setValue(value);
                }}
                pattern={REGEXP_ONLY_DIGITS}
                maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-[14px] text-red-700">
                {error.error ? error.errorMsg : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={async () => {
                // setDisableInput(true);
                await getCode(setLoading, chatter);
                // setDisableInput(false);
                setLoading(false);
              }}
              disabled={loading}
              className={`text-[15px] md:text-[13px] text-[#304fff] ${
                loading ? "opacity-30" : ""
              } text-center mt-5 font-light`}>
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
                } flex gap-1 dark:border-slate-500 items-center text-center py-2 text-[#304fff] border border-slate-300  rounded-md font-light  text-[14px] bg-white`}>
                <AiOutlineRedo />
                wrong email?
              </motion.button>
              <button
                disabled={loading}
                className={`w-36 button-57 ${
                  loading ? "opacity-30" : ""
                } py-2 border border-slate-300 dark:border-slate-500 dark:text-[#d7dadc]  rounded-md font-light text-[#304fff] text-[14px] dark:bg-slate-600 bg-white`}>
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
