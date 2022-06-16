export type CommentType = {
  id: string;
  created_at: Date;
  updated_at: Date;
  body: string;
  user: {
    fullName: string;
    username: string;
    avatarUrl: string;
  };
  article_id: number;
};
