import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  protected waiting: boolean = false;

  protected email: FormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
  ]);
  protected username: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30),
    Validators.pattern(/^[A-Za-z0-9_-]+$/),
  ]);
  protected password: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(8),
  ]);

  public signUpForm: FormGroup = new FormGroup({
    email: this.email,
    username: this.username,
    password: this.password,
  });
  constructor() {}

  public signUp(): void {
    console.log(this.signUpForm.value);
  }
}
