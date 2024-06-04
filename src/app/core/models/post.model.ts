import { Tag } from './tag.model';
import { User } from './user.model';

export interface Post {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
