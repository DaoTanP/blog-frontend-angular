import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  protected waiting: boolean = false;

  protected username: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(5),
  ]);
  protected password: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(8),
  ]);

  public signInForm: FormGroup = new FormGroup({
    username: this.username,
    password: this.password,
  });
  constructor(
    // private httpService: HttpService,
    // private authGuardService: AuthGuardService,
    private router: Router // private alertService: AlertService
  ) {
    // if (authGuardService.isLoggedIn) router.navigate(['home']);
  }

  public signIn(): void {
    //   this.alertService.clearAlert();
    //   this.waiting = true;
    //   const username = this.signinForm.value.username || '';
    //   const password = this.signinForm.value.password || '';
    //   const user = new User();
    //   user.username = username;
    //   user.password = password;
    //   this.httpService.signin(user).subscribe({
    //     next: (res) => {
    //       this.waiting = false;
    //       this.authGuardService.signin(res.id);
    //       this.router.navigate(['home']);
    //     },
    //     error: (err) => {
    //       this.waiting = false;
    //       switch (err.status) {
    //         case 404:
    //           this.alertService.appendAlert(
    //             'Tài khoản không tồn tại, kiểm tra lại tên đăng nhập hoặc mật khẩu',
    //             AlertType.danger,
    //             0,
    //             'form-wrapper'
    //           );
    //           break;
    //         case 0:
    //           this.alertService.appendAlert(
    //             'Không thể kết nối với máy chủ, vui lòng thử lại sau',
    //             AlertType.danger,
    //             0,
    //             'form-wrapper'
    //           );
    //           break;
    //         default:
    //           this.alertService.appendAlert(
    //             'Đã xảy ra lỗi, vui lòng thử lại sau',
    //             AlertType.danger,
    //             0,
    //             'form-wrapper'
    //           );
    //           break;
    //       }
    //     },
    //   });
  }
}
