import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './pages/post-details.component';
import { PostRoutingModule } from './post-routing.module';
import { RouterModule } from '@angular/router';
import { PostCardComponent } from './components/post-card/post-card.component';

@NgModule({
  declarations: [PostDetailsComponent, PostCardComponent],
  imports: [CommonModule, RouterModule, PostRoutingModule],
  exports: [PostCardComponent],
})
export class PostModule {}
