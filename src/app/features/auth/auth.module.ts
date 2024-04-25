import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './pages/sign-in/sign-in.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
