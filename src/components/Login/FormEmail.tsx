import { getCode } from "@/fetch/GetCode";
// import { useSocket } from "@/providers/Socket";
// import { useEmailState, useSocketStateZustand } from "@/store";
// import { useRouter } from "next/navigation";
import React, { type Dispatch, type SetStateAction, useState } from "react";

// import { Online } from "../List/ListEmail";

type Props = {
  openVerifyModel: boolean;
  setOpenVerifyModal: Dispatch<SetStateAction<boolean>>;
  chatter: string;
  setChatter: Dispatch<SetStateAction<string>>;
};

const FormEmail = ({
  openVerifyModel,
  setOpenVerifyModal,
  setChatter,
  chatter
}: Props) => {
  const [loading, setLoading] = useState(false);
  // const { setSenderEmail } = useEmailState();
  // const { push } = useRouter();

  // const { socket } = useSocket();
  // const { setGetOnlineUsers } = useSocketStateZustand();

  return (
    <form
      className={`w-[100%] md:w-[800px] ${
        openVerifyModel ? "opacity-30 z-[-1]" : ""
      }  bg-white dark:bg-[#202020] overflow-hidden shadow-xl rounded-2xl`}
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);

        //
        //
        // const response = await fetch("/api/fakeCookie", {
        //   body: JSON.stringify({ email: chatter }),
        //   method: "POST"
        // });
        // if (response.status === 200) {
        //   setSenderEmail(chatter);
        //   socket?.emit("new-online", chatter);
        //   push("/dm");
        // }
        //
        //

        setOpenVerifyModal(true);

        await getCode(setLoading, chatter, setOpenVerifyModal);
        setLoading(false);
      }}>
      <div className="flex flex-col gap-6 px-4 md:px-24 mt-20 text-center items-center h-[300px]">
        <h1 className="text-2xl dark:text-[#007aff] font-bold text-slate-500">
          Sign in to Message your Family & Friends
        </h1>
        <p className="text-[13px] mt-[-10px] font-light text-slate-500 dark:text-[#d7dadc]">
          Sign in with your email to unlock the power of connection!. We will
          send a secret code to verify your identity.Let the messaging magic
          begin!!!
        </p>
        <input
          required
          value={chatter}
          onChange={(e) => {
            setChatter(e.currentTarget.value);
          }}
          placeholder="Email Address"
          className="bg-[#e3dfdf] text-slate-600 rounded-md  border dark:border-slate-400 p-2 text-[15px] dark:bg-slate-600 dark:text-[#d7dadc] w-72 outline-none "
          type="email"
        />
      </div>
      <div className="bg-[#e3dfdf] dark:bg-[#202020]  border-t dark:border-slate-600 border-slate-300 flex justify-end px-4 py-3 md:py-5 md:px-5">
        <button
          disabled={loading}
          // animate={{ scaleY: 1, backgroundColor: "black" }}
          // initial={{ scaleY: 0, backgroundColor: "red" }}
          // transition={{ duration: 0.4 }}
          className={`w-40 button-57 text ${
            loading ? "opacity-30" : ""
          }  py-4 border border-slate-300  rounded-md font-light dark:border-slate-500 dark:text-[#d7dadc] text-slate-600 text-[14px] bg-white dark:bg-slate-600`}>
          <span>Verify</span>
          <span>Verify</span>
        </button>
      </div>
    </form>
  );
};

export default FormEmail;
