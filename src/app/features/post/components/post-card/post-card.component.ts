import { Component, Input } from '@angular/core';
import { Post } from '@/features/post/models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input() post!: Post;
}
