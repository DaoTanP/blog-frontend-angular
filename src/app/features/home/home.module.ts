import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './pages/feed/feed.component';
import { HomeRoutingModule } from './home-routing.module';
import { PostCardComponent } from '@/shared/components/post-card/post-card.component';

@NgModule({
  declarations: [FeedComponent],
  imports: [CommonModule, HomeRoutingModule, PostCardComponent],
})
export class HomeModule {}
