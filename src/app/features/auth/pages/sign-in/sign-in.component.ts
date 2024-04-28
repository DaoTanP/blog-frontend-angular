import { ApiService } from '@/core/services/api.service';
import { REGEX_PATTERN } from '@/shared/constants/regex-pattern.constant';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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
  constructor(private apiService: ApiService) {}

  public signin(): void {
    //   this.alertService.clearAlert();
    //   this.waiting = true;

    this.apiService.signin(this.signInForm.value).subscribe({
      next: (res) => {
        this.waiting = false;
        console.log(res);

        // this.authGuardService.signin(res.id);
        // this.router.navigate(['home']);
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
