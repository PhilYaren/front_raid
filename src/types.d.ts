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
