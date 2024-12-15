import { type Online } from "@/components/List/ListEmail";
import { useSocket } from "@/providers/Socket";
import { useEmailState, useSocketStateZustand } from "@/store";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useHandleGoogleSignIn =  (chatter: string) => {
  const { replace } = useRouter();
  const { socket } = useSocket();
  const { setGetOnlineUsers } = useSocketStateZustand();
  const { setSenderEmail } = useEmailState();
  const signInWithGoogle = async () => {
    try {
      // Attempt Google sign-in
      const GoogeSignInresult = await signIn("google", {
        callbackUrl: "/dm"
      });
      if (GoogeSignInresult?.ok) {
        socket?.emit("new-online", chatter);
        // setSenderEmail(chatter);
        setSenderEmail(chatter);
        socket &&
          socket?.on("get-users", (user: Online[]) => {
            setGetOnlineUsers(user);
          });
        replace("/dm");
      }
      // Check if sign-in was successful
    } catch (error) {
      console.error("Google sign-in failed", error);
    }
  };
  return {signInWithGoogle};
};

// In your component
