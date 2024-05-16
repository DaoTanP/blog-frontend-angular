import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostRoutingModule } from './post-routing.module';
import { RouterModule } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostDetailsComponent, CreatePostComponent],
  imports: [
    CommonModule,
    RouterModule,
    PostRoutingModule,
    CKEditorModule,
    ReactiveFormsModule,
  ],
})
export class PostModule {}
