import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './features/error/pages/not-found/not-found.component';
import { LoginComponent } from './features/user/pages/login/login.component';
import { RegisterComponent } from './features/user/pages/register/register.component';
import { TwoColumnNavLayoutRoute } from './core/routes/two-column-nav-layout.routes';
import { TwoColumnNavLayoutComponent } from './core/components/layout/two-column-nav-layout/two-column-nav-layout.component';
import { ThreeColumnNavLayoutComponent } from './core/components/layout/three-column-nav-layout/three-column-nav-layout.component';
import { ThreeColumnNavLayoutRoute } from './core/routes/three-column-nav-layout.routes';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: TwoColumnNavLayoutComponent,
    children: TwoColumnNavLayoutRoute,
  },
  {
    path: '',
    component: ThreeColumnNavLayoutComponent,
    children: ThreeColumnNavLayoutRoute,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
