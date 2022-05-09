export type Comment = Record<"comment" | "date" | "id" | "userName", string> & {
  colorID: number;
};

export interface Comments {
  comments: Comment[];
}

export type PostDates = Record<"updatedAt" | "createdAt", Date>;

export type Post = Record<"title" | "content" | "slug" | "creator" | "_id", string> & PostDates & Comments;

export type Posts = Array<Post>;
