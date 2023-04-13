export declare interface User {
  userName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export declare interface Statistic {
  id: number;
  gameName: string;
  players: number;
  result: boolean;
  createdAt: string;
  updatedAt: string;
  playerId: number;
}

export declare interface Message {
  userName: string;
  message: string;
  time: string;
}

export declare type Session = [string, number, number];
