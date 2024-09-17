"use client"
import { useEmailState } from "@/store";
import React, { type FC } from "react";
import { MdOutlineDisabledByDefault } from "react-icons/md";

type Props = {
  email: string;
};

const WhoWeText: FC<Props> = ({ email }) => {
  const { setEmail } = useEmailState((state) => state);
  return (
    <div className="bg-[#f4f5f5] items-center justify-between dark:bg-slate-600 flex px-5 py-3 text-sm text-slate-600">
      <p className="font-semibold text-slate-500 dark:text-[#d7dadc]">
        To: {email}
      </p>
      <MdOutlineDisabledByDefault onClick={() => {setEmail("")}} className="text-slate-500 text-lg cursor-pointer hover:opacity-70 dark:text-[#d7dadc] " />
    </div>
  );
};

export default WhoWeText;
