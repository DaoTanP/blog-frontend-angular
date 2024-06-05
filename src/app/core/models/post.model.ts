import { Comment } from './comment.model';
import { Tag } from './tag.model';
import { User } from './user.model';

export interface Post {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
  user: User;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
