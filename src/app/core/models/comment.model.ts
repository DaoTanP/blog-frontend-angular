import { Post } from './post.model';
import { User } from './user.model';

export interface Comment {
  id: string;
  body: string;
  post: Post;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
