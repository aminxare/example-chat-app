export interface User {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: string;
  name?: string;
  avatar?: string;
}
