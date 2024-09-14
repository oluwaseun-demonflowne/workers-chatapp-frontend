"use client";
import React, { useState } from "react";
import VerifyEmail from "./VerifyEmail";
import FormEmail from "./FormEmail";

const Login = () => {
  const [chatter, setChatter] = useState("");
  const [openVerifyModel, setOpenVerifyModal] = useState(false);

  return (
    <div className="">
      <VerifyEmail
        setOpenVerifyModel={setOpenVerifyModal}
        chatter={chatter}
        openVerifyModel={openVerifyModel}
      />
      <FormEmail
        chatter={chatter}
        setChatter={setChatter}
        openVerifyModel={openVerifyModel}
        setOpenVerifyModal={setOpenVerifyModal}
      />
    </div>
  );
};

export default Login;
