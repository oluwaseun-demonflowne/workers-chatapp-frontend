"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthUse";
import { useEmailState } from "@/store";
import { type JWTVerifyResult, jwtVerify } from "jose";
import Cookies from "universal-cookie";

type payloadType = {
  email: string;
  iat: number;
  exp: number;
};

type AuthContextType = {
  email: string | null;
};

const AuthContext = createContext<AuthContextType>({
  email: null
});

export const useAuthHere = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const [email, setEmail] = useState<string | null>("");

  //   const KnowIfEmailExists = await useAuth();
  const { setSenderEmail, senderEmail } = useEmailState();
  const cookieStore = new Cookies();
  const token = cookieStore.get("chat-auth");
  // console.log(token);

  const Auth = async () => {
    // console.log("doe this run");
    // console.log(token);
    if (token === null) {
      setEmail(null);
      return null;
    }
    // console.log(cookieStore);
    try {
      const payload: JWTVerifyResult<payloadType> = await jwtVerify(
        token,
        new TextEncoder().encode("14f7caeb710d535c6d334390db7862e3")
      );
      console.log(payload.payload.email);
      setSenderEmail(payload.payload.email);
      return payload.payload.email;
    } catch (error) {
      console.log(error);
      setEmail(null);
      return null;
    }
  };

  console.log(email, "nothing");

  useEffect(() => {
    const startAuth = async () => {
      await Auth();
      if (email === null && pathname === "/dm") {
        push("/login");
      }
    };
    startAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderEmail]);

  return (
    <AuthContext.Provider value={{ email }}>{children}</AuthContext.Provider>
  );
};
