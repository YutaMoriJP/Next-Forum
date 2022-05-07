export interface ColorId {
  colorID: number;
}

export type Reply = Record<"comment" | "originalUser", string> & ColorId;

export type Comment = Record<"comment" | "id" | "userName" | "date", string> & ColorId & { reply?: Reply };

export type Comments = Array<Comment>;
