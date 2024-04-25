import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './pages/feed/feed.component';
import { TwoColumnNavLayoutComponent } from '@/core/layouts/two-column-nav-layout/two-column-nav-layout.component';

const routes: Routes = [
  {
    path: '',
    component: TwoColumnNavLayoutComponent,
    children: [{ path: '', component: FeedComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
