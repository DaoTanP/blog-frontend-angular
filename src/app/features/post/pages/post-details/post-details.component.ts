import { Post } from '@/core/models/post.model';
import { ApiService } from '@/core/services/api.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent {
  protected blogPost$!: Observable<Post>;
  protected headlineBgColor!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    // this.activatedRoute.paramMap.subscribe((params) => {
    //   const id: string = params.get('id') || '';
    //   this.post = apiService.getPostById(id);
    // });

    this.blogPost$ = this.activatedRoute.paramMap.pipe(
      switchMap((params) =>
        this.apiService.getPostById(params.get('id') || 'not-found')
      )
    );

    this.apiService
      .get('https://x-colors.yurace.pro/api/random/all?type=dark')
      .subscribe((res: any) => {
        this.headlineBgColor = res.hex;
      });
  }
}
