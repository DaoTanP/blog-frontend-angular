import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User } from '@/core/models/user.model';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User | null>;
  public user$: Observable<User | null>;

  get user() {
    return this.userSubject.value;
  }

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    // this.user = this.userSubject.asObservable();
    this.user$ = apiService.getProfile().pipe(
      map((user) => {
        this.userSubject.next(user);
        return user;
      })
    );

    // apiService.getProfile().subscribe({
    //   next: (res: User) => {
    //     this.userSubject.next(res);
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     console.error(err);
    //   },
    // });
  }

  public get isLoggedIn(): Observable<boolean> {
    return this.authService.refreshToken.pipe(map((token) => token !== null));
  }

  public logout(): void {
    this.authService.revokeToken();
  }
}
