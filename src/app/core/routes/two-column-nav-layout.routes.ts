import { Routes } from '@angular/router';

export const TwoColumnNavLayoutRoute: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@/features/post/post.module').then((module) => module.PostModule),
  },
];
