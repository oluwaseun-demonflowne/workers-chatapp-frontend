import { type Online } from "@/components/List/ListEmail";
import { useSocket } from "@/providers/Socket";
import { useEmailState, useSocketStateZustand } from "@/store";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useVerifyToken = (chatter: string) => {
  const { replace} = useRouter();
  const { socket } = useSocket();
  const { setGetOnlineUsers } = useSocketStateZustand();
  const { setSenderEmail } = useEmailState();
  const [error, setError] = useState({ error: false, errorMsg: "" });
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const login = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/VerifyToken", {
        method: "POST",
        body: JSON.stringify({
          email: chatter
        }),
        headers: { otpToken: value }
      });
      if (response.status === 200) {
        socket?.emit("new-online", chatter);
        setSenderEmail(chatter);
        setSenderEmail(chatter);
        socket &&
          socket?.on("get-users", (user: Online[]) => {
            setGetOnlineUsers(user);
          });
        await signIn("credentials", {
          redirect: false,
          email: chatter
        }).then(async (callback) => {
          if (callback?.url === null) {
            toast.error("Unknown error, Retry :(", {
              position: "top-center"
            });
            setLoading(false);
            return;
          }
          if (callback?.error === null) {
            replace("/dm");
          }
        });
        // push("/dm");
      }
      if (response.status === 500) {
        setLoading(false);
        setValue("");
      }
      if (response.status === 401) {
        // incorrect key , please retry
        setError({
          error: true,
          errorMsg: "incorrect key , please retry"
        });
        setValue("");
        setLoading(false);
      }
      if (response.status === 402) {
        setError({
          error: true,
          errorMsg: "Token expired, please request new token"
        });
        setLoading(false);
        setValue("");
      }

      // setOpenVerifyModal(true);
    } catch (error) {
      setLoading(false);
      setValue("");
    }
  };
  return {
    login,
    loading,
    setLoading,
    value,
    setValue,
    error, setError
  };
};
