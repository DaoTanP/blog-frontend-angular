import { SignInDTO } from '@/core/models/dto/sign-in.dto';
import { TokenDTO } from '@/core/models/dto/token.dto';
import { ApiService } from '@/core/services/api.service';
import { AuthService } from '@/core/services/auth.service';
import { REGEX_PATTERN } from '@/shared/constants/regex-pattern.constant';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  protected waiting: boolean = false;

  protected usernameOrEmailFormControl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30),
    Validators.pattern(REGEX_PATTERN.username),
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
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  public signin(): void {
    //   this.alertService.clearAlert();
    //   this.waiting = true;

    const signInDTO: SignInDTO = this.signInForm.value as SignInDTO;

    this.apiService.signin(signInDTO).subscribe({
      next: (res: TokenDTO) => {
        this.waiting = false;
        this.authService.setToken(res);

        // this.authGuardService.signin(res.id);
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.waiting = false;
        switch (err.status) {
          case 404:
            break;
          case 0:
            break;
          default:
            break;
        }
      },
    });
  }
}
