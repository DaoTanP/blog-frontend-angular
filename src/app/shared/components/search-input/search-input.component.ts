import { Post } from '@/core/models/post.model';
import { ApiService } from '@/core/services/api.service';
import { ClickOutsideDirective } from '@/shared/directives/click-outside.directive';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ClickOutsideDirective],
})
export class SearchInputComponent {
  searchResults$!: Observable<Post[]>;
  isDropDownOpened: boolean = false;
  constructor(private router: Router, private apiService: ApiService) {}
  searchPost(query: string) {
    this.searchResults$ = this.apiService.searchPost(query, 0, 5);

    this.isDropDownOpened = true;
  }

  onOutsideClick(): void {
    this.isDropDownOpened = false;
  }
}
