import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './pages/feed/feed.component';
import { HomeRoutingModule } from './home-routing.module';
import { PostCardComponent } from '@/shared/components/post-card/post-card.component';
import { LandingComponent } from './pages/landing/landing.component';

@NgModule({
  declarations: [FeedComponent, LandingComponent],
  imports: [CommonModule, HomeRoutingModule, PostCardComponent],
})
export class HomeModule {}
