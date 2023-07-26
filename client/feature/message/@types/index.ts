export interface Message {
  text: string;
  roomId: string;
  createDate: string;
  creatorUsername: string;
}

export interface MessageGroup {
  [roomId: string]: Message[],
}