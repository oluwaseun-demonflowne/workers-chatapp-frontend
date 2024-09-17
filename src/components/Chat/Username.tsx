"use client";
import { useEmailState } from "@/store";
import React from "react";

const Username = () => {
  const { senderEmail } = useEmailState();
  return <div className="flex justify-between items-center">{senderEmail}</div>;
};

export default Username;
