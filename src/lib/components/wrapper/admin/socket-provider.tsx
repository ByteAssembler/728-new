import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import type { ManagerOptions, SocketOptions } from 'socket.io-client';

type SocketHookOptions = Partial<ManagerOptions & SocketOptions>;

type EmitFunction = (eventName: string, data: unknown, ack?: (...args: unknown[]) => void) => boolean;

interface UseSocketIOReturn {
  socket: Socket | null;
  isConnected: boolean;
  lastError: Error | null;
  emitEvent: EmitFunction;
}

export function useSocketIO(uri: string, opts?: SocketHookOptions): UseSocketIOReturn {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastError, setLastError] = useState<Error | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    console.log(`useSocketIO: Attempting to connect to ${uri}`);
    const connectionOptions = opts || {};
    const newSocket = io(uri, {
      ...connectionOptions,
      transports: ['websocket'],
    });

    setSocket(newSocket);
    setIsConnected(newSocket.connected);
    setLastError(null);

    const handleConnect = () => {
      console.log(`useSocketIO: Connected - Socket ID: ${newSocket.id}`);
      setIsConnected(true);
      setLastError(null);
    };

    const handleDisconnect = (reason: Socket.DisconnectReason) => {
      console.warn(`useSocketIO: Disconnected - Reason: ${reason}`);
      setIsConnected(false);
    };

    const handleConnectError = (error: Error) => {
      console.error('useSocketIO: Connection Error -', error);
      setIsConnected(false);
      setLastError(error);
    };

    newSocket.on('connect', handleConnect);
    newSocket.on('disconnect', handleDisconnect);
    newSocket.on('connect_error', handleConnectError);

    return () => {
      console.log(`useSocketIO: Cleaning up socket connection to ${uri}`);
      newSocket.off('connect', handleConnect);
      newSocket.off('disconnect', handleDisconnect);
      newSocket.off('connect_error', handleConnectError);

      if (newSocket.active) {
        newSocket.disconnect();
      }

      setSocket(null);
      setIsConnected(false);
      setLastError(null);
    };
  }, [uri, opts]);

  const emitEvent: EmitFunction = useCallback(
    (eventName, data, ack) => {
      if (socket && isConnected) {
        console.log(`useSocketIO: Emitting event "${eventName}" with data:`, data);
        if (ack) socket.emit(eventName, data, ack); else socket.emit(eventName, data);
        return true;
      } else {
        console.warn(
          `useSocketIO: Could not emit event "${eventName}". Socket not connected.`
        );
        return false;
      }
    },
    [socket, isConnected]
  );

  return { socket, isConnected, lastError, emitEvent };
}
