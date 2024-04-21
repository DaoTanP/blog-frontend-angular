import { Routes } from '@angular/router';

export const ThreeColumnNavLayoutRoute: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@/features/home/home.module').then((module) => module.HomeModule),
  },
];
