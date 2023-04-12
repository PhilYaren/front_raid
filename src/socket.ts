import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_API_URL;
export const socket = io(URL, {
  autoConnect: false,
  reconnectionDelay: 1000,
});

export const chatSocket = io(`${URL}/chat`, {
  autoConnect: false,
  reconnectionDelay: 10000,
});
4
export const sessionSocket = io(`${URL}/sessions`, {
  autoConnect: false,
  reconnectionDelay: 10000,
})
