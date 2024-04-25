import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoWrapperDirective } from './directives/no-wrapper.directive';

@NgModule({
  declarations: [NoWrapperDirective],
  imports: [CommonModule, RouterModule],
  exports: [NoWrapperDirective],
})
export class SharedModule {}
