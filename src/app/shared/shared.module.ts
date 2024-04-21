import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from './components/logo/logo.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NoWrapperDirective } from './directives/no-wrapper.directive';
import { SearchInputComponent } from './components/search-input/search-input.component';

@NgModule({
  declarations: [
    LogoComponent,
    SideNavComponent,
    NoWrapperDirective,
    SearchInputComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    LogoComponent,
    SideNavComponent,
    NoWrapperDirective,
    SearchInputComponent,
  ],
})
export class SharedModule {}
