import React, { createContext, use, useEffect, useRef, useMemo } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  getSocket: (url: string) => Socket;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<Map<string, Socket>>(new Map());

  const getSocket = (url: string) => {
    if (!socketRef.current.has(url)) {
      const newSocket = io(url);
      socketRef.current.set(url, newSocket);

      newSocket.on("connect", () => {
        console.log(`Connected to ${url}`);
      });

      newSocket.on("disconnect", () => {
        console.log(`Disconnected from ${url}`);
      });
    }

    return socketRef.current.get(url)!;
  };

  useEffect(() => {
    const currentSocketRef = socketRef.current;
    return () => {
      // Cleanup all sockets on unmount
      currentSocketRef.forEach((socket) => socket.disconnect());
      currentSocketRef.clear();
    };
  }, []);

  const contextValue = useMemo(() => ({ getSocket }), []);

  return (
    <SocketContext value={contextValue}>
      {children}
    </SocketContext>
  );
};

const useSocket = (url: string) => {
  const context = use(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  const { getSocket } = context;
  const socket = getSocket(url);

  return {
    socket,
    on: (event: string, callback: (..._args: unknown[]) => void) => {
      socket.on(event, callback);
    },
    off: (event: string, callback: (..._args: unknown[]) => void) => {
      socket.off(event, callback);
    },
    emit: (event: string, payload: unknown) => {
      socket.emit(event, payload);
    },
  };
};

export { SocketProvider, useSocket };
