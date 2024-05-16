import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './pages/feed/feed.component';
import { TwoColumnNavLayoutComponent } from '@/core/layouts/two-column-nav-layout/two-column-nav-layout.component';
import { HeaderLayoutComponent } from '@/core/layouts/header-layout/header-layout.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: TwoColumnNavLayoutComponent,
    children: [{ path: '', component: FeedComponent }],
  },
  {
    path: 'landing',
    component: HeaderLayoutComponent,
    children: [{ path: '', component: LandingComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
