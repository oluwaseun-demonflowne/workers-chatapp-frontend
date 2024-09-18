"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useEmailState } from "@/store";

type AuthContextType = {
  email: string | null;
  setEmail: (email: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthHere = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({
  children,
  emails
}: {
  children: React.ReactNode;
  emails: string | null | undefined;
}) => {
  const [email, setEmail] = useState<string | null>("");
  const { setSenderEmail } = useEmailState();

  useEffect(() => {
    setEmail(emails!);
    setSenderEmail(emails!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, emails]);
  return (
    <AuthContext.Provider value={{ email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
