"use client";
import { type Online } from "@/components/List/ListEmail";
import { useSocketStateZustand } from "@/store";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { type Socket, io } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  // const { senderEmail } = useEmailState();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { setGetOnlineUsers } = useSocketStateZustand();
  const { data: session } = useSession();

  useEffect(() => {
    const socket: Socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!);
    // const socket: Socket = io("http://localhost:5001");

    socket.on("connect", () => {
      setIsConnected(true);
    });

    if (!session?.user?.email) {
      socket.emit("new-online", session?.user?.email);

      socket.emit("get-users", session?.user?.email);
    }
    socket?.on("get-users", (user: Online[]) => {
      setGetOnlineUsers(user);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socket);

    // return () => {

    // };
    return () => {
      socket?.off("get-users");
      socket?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
