import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  protected waiting: boolean = false;

  protected username: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(5),
  ]);
  protected password: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(8),
  ]);

  public signUpForm: FormGroup = new FormGroup({
    username: this.username,
    password: this.password,
  });
  constructor() {}

  public signUp(): void {}
}
