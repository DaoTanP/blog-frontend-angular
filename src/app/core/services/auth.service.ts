import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { ApiService } from './api.service';
import { TokenDTO } from '@/core/models/dto/token.dto';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private refreshTokenSubject: BehaviorSubject<string | null>;
  public refreshToken: Observable<string | null>;

  constructor(private router: Router, private apiService: ApiService) {
    this.refreshTokenSubject = new BehaviorSubject<string | null>(null);
    this.refreshToken = this.refreshTokenSubject.asObservable();
  }

  private get refreshTokenValue(): string | null {
    return this.refreshTokenSubject.value;
  }

  public get isLoggedIn(): boolean {
    return this.refreshTokenSubject.value !== null;
  }

  setToken(tokenDTO: TokenDTO) {
    this.refreshTokenSubject.next(tokenDTO.accessToken);
    this.startRefreshTokenTimer();

    return tokenDTO.accessToken;
  }

  removeToken() {
    this.stopRefreshTokenTimer();
    this.refreshTokenSubject.next(null);
  }

  revokeToken() {
    return this.apiService.signout().subscribe((response: boolean) => {
      if (response) this.removeToken();

      return null;
    });
  }

  refreshAccessToken() {
    return this.apiService
      .refreshAccessToken()
      .pipe(
        map((response: TokenDTO) => {
          this.refreshTokenSubject.next(response.accessToken);
          this.startRefreshTokenTimer();

          return response.accessToken;
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            default:
              this.removeToken();
              return of(null);
          }
        })
      );
  }

  // helper methods

  private refreshTokenTimeout!: any;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded refreshToken token
    const refreshTokenPayload = JSON.parse(
      atob(this.refreshTokenValue!.split('.')[1])
    );

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(refreshTokenPayload.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshAccessToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
