import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './pages/post-details.component';
import { PostRoutingModule } from './post-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PostDetailsComponent],
  imports: [CommonModule, RouterModule, PostRoutingModule],
})
export class PostModule {}
