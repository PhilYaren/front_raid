import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_API_URL;
const socket = io(URL, {
  autoConnect: false,
  reconnectionDelay: 1000,
});

export default socket;
