import { Component, Input } from '@angular/core';
import { Post } from '@/core/models/post.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared/shared.module';
import { ApiService } from '@/core/services/api.service';
import { AlertService } from '@/core/services/alert.service';
import { AlertType } from '@/shared/constants/alert-type.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-card',
  standalone: true,
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
  imports: [CommonModule, RouterModule, SharedModule],
})
export class PostCardComponent {
  @Input() post!: Post;

  constructor(
    private apiService: ApiService,
    private alertService: AlertService
  ) {}

  deletePost() {
    this.apiService.deletePost(this.post.id).subscribe({
      next: (res) => {
        if (res)
          this.alertService.push(
            'Post deleted successfully',
            AlertType.SUCCESS
          );
        else
          this.alertService.push(
            'An error has occurred, please try again later.'
          );
      },
      error: (err: HttpErrorResponse) => {
        switch (err.status) {
          case 401:
            this.alertService.push(
              'You are not authorized to delete this post'
            );
        }
      },
      complete: () => {},
    });
  }
}
