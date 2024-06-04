import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { PostCardComponent } from '@/shared/components/post-card/post-card.component';
import { PostSrollPaginationComponent } from '@/shared/components/post-sroll-pagination/post-sroll-pagination.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    PostCardComponent,
    PostSrollPaginationComponent,
  ],
})
export class UserModule {}
