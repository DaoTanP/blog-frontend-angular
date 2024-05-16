import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@/core/services/api.service';
import { REGEX_PATTERN } from '@/shared/constants/regex-pattern.constant';
import {
  emailExistValidator,
  usernameExistValidator,
} from '@/shared/validators/api.validator';
import { SignUpDTO } from '@/core/models/dto/sign-up.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@/core/services/auth.service';
import { TokenDTO } from '@/core/models/dto/token.dto';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  protected waiting: boolean = false;

  protected emailFormControl: FormControl = new FormControl(
    null,
    [Validators.required, Validators.email],
    [emailExistValidator(this.apiService)]
  );
  protected usernameFormControl: FormControl = new FormControl(
    null,
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(REGEX_PATTERN.username),
    ],
    [usernameExistValidator(this.apiService)]
  );
  protected passwordFormControl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(8),
  ]);

  public signUpForm: FormGroup = new FormGroup({
    email: this.emailFormControl,
    username: this.usernameFormControl,
    password: this.passwordFormControl,
  });

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  public signUp(): void {
    const signUpDTO: SignUpDTO = this.signUpForm.value as SignUpDTO;
    this.apiService.signup(signUpDTO).subscribe({
      next: (res: TokenDTO) => {
        console.log(res);
        this.authService.setToken(res);
      },
      error: (err: HttpErrorResponse) => {
        switch (err.status) {
          case 0:
            break;
          default:
            break;
        }
      },
    });
  }
}
