import { SignInDTO } from '@/core/models/dto/sign-in.dto';
import { TokenDTO } from '@/core/models/dto/token.dto';
import { AlertService } from '@/core/services/alert.service';
import { ApiService } from '@/core/services/api.service';
import { AuthService } from '@/core/services/auth.service';
import { AlertType } from '@/shared/constants/alert-type.enum';
import { REGEX_PATTERN } from '@/shared/constants/regex-pattern.constant';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  protected loading: boolean = false;
  protected usernameOrEmailFormControl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30),
  ]);
  protected passwordFormControl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(8),
  ]);

  public signInForm: FormGroup = new FormGroup({
    usernameOrEmail: this.usernameOrEmailFormControl,
    password: this.passwordFormControl,
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  public signin(): void {
    this.alertService.clear();
    this.loading = true;

    const signInDTO: SignInDTO = this.signInForm.value as SignInDTO;

    this.apiService.signin(signInDTO).subscribe({
      next: (res: TokenDTO) => {
        this.authService.setToken(res);

        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        switch (err.status) {
          case 401:
            this.alertService.push(
              'We couldn’t find an account matching the username and password you entered. Please check your username and password and try again.'
            );
            break;
          case 0:
            break;
          default:
            break;
        }
        this.loading = false;
      },
    });
  }
}
