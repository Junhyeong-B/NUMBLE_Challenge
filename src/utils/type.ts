export interface Post {
  postId: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostDetail {
  post: PostDetailPost;
  comments: PostDetailComment[];
}

export interface PostDetailPost {
  postId: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostDetailComment {
  commentId: string;
  postId: string;
  content: string;
}
