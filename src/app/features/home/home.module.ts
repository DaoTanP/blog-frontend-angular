import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home.component';
import { SharedModule } from '@/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { PostModule } from '@/features/post/post.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, PostModule],
})
export class HomeModule {}
