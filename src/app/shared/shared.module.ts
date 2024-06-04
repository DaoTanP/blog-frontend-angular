import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoWrapperDirective } from './directives/no-wrapper.directive';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { HtmlToPlainTextPipe } from './pipes/html-to-plain-text.pipe';

@NgModule({
  declarations: [NoWrapperDirective, DateAgoPipe, HtmlToPlainTextPipe],
  imports: [CommonModule, RouterModule],
  exports: [NoWrapperDirective, DateAgoPipe, HtmlToPlainTextPipe],
})
export class SharedModule {}
