import { AlertService } from '@/core/services/alert.service';
import { ApiService } from '@/core/services/api.service';
import { UserService } from '@/core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '@/core/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  isCommenting: boolean = false;
  isLoading: boolean = false;
  postId!: string;
  commentSubject: BehaviorSubject<Comment[]>;
  comments$: Observable<Comment[]>;

  commentFormControl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.maxLength(255),
  ]);
  public commentForm: FormGroup = new FormGroup({
    body: this.commentFormControl,
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      const postId = params.get('id');
      if (postId) this.postId = postId;
    });

    this.commentSubject = new BehaviorSubject<Comment[]>([]);
    this.comments$ = this.commentSubject.asObservable();

    this.refreshComments();
  }

  refreshComments() {
    this.apiService
      .getAllComments(this.postId)
      .subscribe((comments: Comment[]) => {
        this.commentSubject.next(comments);
      });
  }

  public submitComment(): void {
    this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      if (!isLoggedIn)
        this.router.navigate(['/auth/signin'], {
          queryParams: { returnUrl: this.router.url },
        });
    });

    this.isLoading = true;

    this.apiService
      .submitComment(this.postId, this.commentForm.value)
      .subscribe({
        next: (res) => {
          this.refreshComments();
          this.commentFormControl.setValue(null);
        },
        error: console.error,
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
