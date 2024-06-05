import { Post } from '@/core/models/post.model';
import { ApiService } from '@/core/services/api.service';
import { ClickOutsideDirective } from '@/shared/directives/click-outside.directive';
import { SharedModule } from '@/shared/shared.module';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ClickOutsideDirective,
  ],
})
export class SearchInputComponent {
  searchResults$!: Observable<Post[]>;
  isDropDownOpened: boolean = false;
  constructor(private router: Router, private apiService: ApiService) {
    this.searchResults$ = this.apiService.getAllPosts(
      Math.round(Math.random() * 10),
      5
    );
  }
  searchPost(query: string) {
    this.searchResults$ = timer(1000).pipe(
      switchMap(() => this.apiService.searchPost(query, 0, 5))
    );

    this.isDropDownOpened = true;
  }

  onOutsideClick(): void {
    this.isDropDownOpened = false;
  }
}
