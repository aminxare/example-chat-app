export interface Message {
  to: {
    username: string;
    socketId?: string;
  };
  from: {
    username: string;
    socketId?: string;
  };
  text: string;
  createDate: string;
}
