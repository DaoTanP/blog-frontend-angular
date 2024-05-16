import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { HeaderLayoutComponent } from '@/core/layouts/header-layout/header-layout.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { TwoColumnNavLayoutComponent } from '@/core/layouts/two-column-nav-layout/two-column-nav-layout.component';

const routes: Routes = [
  {
    path: 'create',
    component: TwoColumnNavLayoutComponent,
    children: [{ path: '', component: CreatePostComponent }],
  },
  {
    path: ':title',
    component: HeaderLayoutComponent,
    children: [{ path: '', component: PostDetailsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
