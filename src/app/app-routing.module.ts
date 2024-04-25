import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './features/error/pages/not-found/not-found.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('@/features/home/home.module').then((module) => module.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@/features/auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('@/features/post/post.module').then((module) => module.PostModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
