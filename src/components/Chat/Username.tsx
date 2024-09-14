"use client";
import { useEmailState } from "@/store";
import React from "react";


const Username = () => {
  const { senderEmail } = useEmailState();
  return <div>{senderEmail}</div>;
};

export default Username;
