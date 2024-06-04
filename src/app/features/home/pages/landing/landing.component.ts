import { Post } from '@/core/models/post.model';
import { ApiService } from '@/core/services/api.service';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  protected posts: Observable<Post[]> = of([]);
  constructor(private apiService: ApiService) {}
}
