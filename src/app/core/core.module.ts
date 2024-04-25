import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderLayoutComponent } from './layouts/header-layout/header-layout.component';
import { SearchInputComponent } from '@/shared/components/search-input/search-input.component';
import { LogoComponent } from '@/shared/components/logo/logo.component';
import { FormsModule } from '@angular/forms';
import { TwoColumnNavLayoutComponent } from './layouts/two-column-nav-layout/two-column-nav-layout.component';
import { ThreeColumnNavLayoutComponent } from './layouts/three-column-nav-layout/three-column-nav-layout.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderLayoutComponent,
    SideNavComponent,
    TwoColumnNavLayoutComponent,
    ThreeColumnNavLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SearchInputComponent,
    LogoComponent,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import it in the AppModule only.`
      );
    }
  }
}
