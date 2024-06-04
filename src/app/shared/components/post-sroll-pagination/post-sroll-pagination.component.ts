import { Post } from '@/core/models/post.model';
import { AlertService } from '@/core/services/alert.service';
import { ApiService } from '@/core/services/api.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PostCardComponent } from '@/shared/components/post-card/post-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-sroll-pagination',
  templateUrl: './post-sroll-pagination.component.html',
  styleUrl: './post-sroll-pagination.component.css',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, PostCardComponent],
})
export class PostSrollPaginationComponent {
  items: Post[] = [];
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 5;

  username: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private alertService: AlertService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username');
    });
  }

  ngOnInit(): void {
    this.appendData();
  }

  toggleLoading = () => (this.isLoading = !this.isLoading);

  // this method will be called on scrolling the page
  appendData = () => {
    if (this.username) {
      this.fetchAllByUsername(this.username);
      return;
    }
    this.fetchAll();
  };

  onScroll = () => {
    console.log('Scrolling...');

    this.currentPage++;
    this.appendData();
  };

  fetchAll = () => {
    this.toggleLoading();
    this.apiService
      .getAllPosts(
        (this.currentPage - 1) * this.itemsPerPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (response: Post[]) => (this.items = [...this.items, ...response]),
        error: (err: HttpErrorResponse) => this.alertService.push(err.message),
        complete: () => this.toggleLoading(),
      });
  };

  fetchAllByUsername = (username: string) => {
    this.toggleLoading();
    this.apiService
      .getAllPostsByUsername(
        username,
        (this.currentPage - 1) * this.itemsPerPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (response: Post[]) => (this.items = [...this.items, ...response]),
        error: (err: HttpErrorResponse) => this.alertService.push(err.message),
        complete: () => this.toggleLoading(),
      });
  };
}
