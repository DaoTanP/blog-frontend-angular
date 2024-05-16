import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import Editor from '@/shared/ckeditor5-41.3.1/build/ckeditor';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Subscription } from 'rxjs';
import { ApiService } from '@/core/services/api.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  public editor = Editor.Editor;

  protected titleFormControl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.maxLength(300),
  ]);

  protected bodyFormControl: FormControl = new FormControl(
    '<p>Press <kbd>Alt</kbd>+<kbd>0</kbd> (<kbd>⌥0</kbd> on Mac) while editing to display the list of available keyboard shortcuts.</p>',
    [Validators.required]
  );

  @ViewChildren('tagInput') tagInputs!: QueryList<ElementRef>;
  private subscription: Subscription = new Subscription();
  protected tagsFormArray: FormArray = new FormArray<any>([]);

  public postForm: FormGroup = new FormGroup({
    title: this.titleFormControl,
    body: this.bodyFormControl,
    tags: this.tagsFormArray,
  });

  constructor(private apiService: ApiService) {}

  ngAfterViewInit() {
    this.subscription = this.tagInputs.changes.subscribe((res) => {
      if (res.length > 0) {
        res.last.nativeElement.focus();
      }
    });
  }

  //memory leak avoidance
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // need for dynamic adds of elements to re
  //focus may not be needed by others
  trackByFn(index: any, item: any) {
    return index;
  }

  createPost(): void {
    this.apiService.createPost(this.postForm.value).subscribe();
  }

  getTag(index: number): FormControl {
    return this.tagsFormArray.at(index) as FormControl;
  }

  addTag(tag: string): void {
    this.tagsFormArray.push(new FormControl(tag));
  }

  removeTag(index: number): void {
    this.tagsFormArray.removeAt(index);
  }

  removeTagIfEmpty(event: Event, index: number): void {
    event.preventDefault();
    const tag: string = this.tagsFormArray.at(index).value;
    if (!tag || tag === '') this.removeTag(index);
  }

  trimTag(event: Event, index: number): void {
    event.preventDefault();
    const tag: FormControl = this.tagsFormArray.at(index) as FormControl;
    if (tag.value && tag.value !== '') tag.setValue(tag.value.trim());
  }

  replaceSpaceWithUnderscore(event: Event, index: number): void {
    event.preventDefault();
    const tag: FormControl = this.tagsFormArray.at(index) as FormControl;
    if (tag.value && tag.value !== '')
      tag.setValue(tag.value.replace(/\s/g, '_'));
  }
}
