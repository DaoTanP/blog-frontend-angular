import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwoColumnNavLayoutComponent } from '@/core/layouts/two-column-nav-layout/two-column-nav-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: ':username',
    component: TwoColumnNavLayoutComponent,
    children: [{ path: '', component: ProfileComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
