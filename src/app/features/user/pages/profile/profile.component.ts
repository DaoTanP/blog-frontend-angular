import { Comment } from '@/core/models/comment.model';
import { User } from '@/core/models/user.model';
import { ApiService } from '@/core/services/api.service';
import { UserService } from '@/core/services/user.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user$!: Observable<User>;
  isLoggedInUserProfile!: boolean;
  isFollowing!: boolean;
  isWaitingForFollowEvent: boolean = false;

  comments$!: Observable<Comment[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  ) {
    this.user$ = this.activatedRoute.paramMap.pipe(
      switchMap((params) => this.getProfile(params.get('username') || ''))
    );
  }

  getProfile(username: string) {
    return this.userService.user$.pipe(
      switchMap((user: User | null) => {
        this.isLoggedInUserProfile = !(!user || user.username !== username);
        this.isFollowing =
          (user &&
            user.following.findIndex((u: User) => u.username === username) >
              -1) ||
          false;
        this.comments$ = this.apiService.getAllCommentsByUsername(username);

        if (!user || user.username !== username)
          return this.apiService.getProfile(username);

        return of(user);
      })
    );
  }

  follow() {
    this.isWaitingForFollowEvent = true;
    this.user$.subscribe((user) => {
      this.apiService.followUser(user.id).subscribe({
        next: (res) => {
          if (!res) console.error('error');
          this.user$ = this.getProfile(user.username);
        },
        error: console.error,
        complete: () => (this.isWaitingForFollowEvent = false),
      });
    });
  }

  unfollow() {
    this.isWaitingForFollowEvent = true;
    this.user$.subscribe((user) => {
      this.apiService.unfollowUser(user.id).subscribe({
        next: (res) => {
          if (!res) console.error('error');
          this.user$ = this.getProfile(user.username);
        },
        error: console.error,
        complete: () => (this.isWaitingForFollowEvent = false),
      });
    });
  }
}
