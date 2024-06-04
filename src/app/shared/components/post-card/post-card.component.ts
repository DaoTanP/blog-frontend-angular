import { Component, Input } from '@angular/core';
import { Post } from '@/core/models/post.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared/shared.module';

@Component({
  selector: 'app-post-card',
  standalone: true,
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
  imports: [CommonModule, RouterModule, SharedModule],
})
export class PostCardComponent {
  @Input() post!: Post;
}
