import { Post } from './post.model';

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  biography: string;
  avatarImage: string;
  bannerImage: string;
  createdAt: string;
  posts: Post[];
}
