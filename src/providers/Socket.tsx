"use client";
import { type Online } from "@/components/List/ListEmail";
import { useEmailState, useSocketStateZustand } from "@/store";
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
  const { senderEmail } = useEmailState();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { setGetOnlineUsers } = useSocketStateZustand();

  useEffect(() => {
    const socket: Socket = io("http://localhost:5001");

    socket.on("connect", () => {
      setIsConnected(true);
    });

    if (senderEmail !== "") {
      socket.emit("new-online", senderEmail);

      socket.emit("get-users", senderEmail);
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
  }, [senderEmail]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
