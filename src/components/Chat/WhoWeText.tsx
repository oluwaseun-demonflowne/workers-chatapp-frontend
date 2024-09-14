import React, { type FC } from "react";

type Props = {
    email:string
};

const WhoWeText:FC<Props> = ({email}) => {
  return (
    <div className="bg-[#f4f5f5] dark:bg-slate-600  px-5 py-3 text-sm text-slate-600">
      <p className="font-semibold text-slate-500 dark:text-[#d7dadc]">
        To: {email}
      </p>
    </div>
  );
};

export default WhoWeText;
