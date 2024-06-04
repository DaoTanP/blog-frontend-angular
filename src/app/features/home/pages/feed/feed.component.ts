import { Post } from '@/core/models/post.model';
import { ApiService } from '@/core/services/api.service';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  protected posts: Observable<Post[]> = of([]);
  constructor(private apiService: ApiService) {
    // this.posts = this.apiService.getAllPosts();
  }
}
