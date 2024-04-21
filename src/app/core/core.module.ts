import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@/shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderLayoutComponent } from './components/layout/header-layout/header-layout.component';
import { TwoColumnNavLayoutComponent } from './components/layout/two-column-nav-layout/two-column-nav-layout.component';
import { ThreeColumnNavLayoutComponent } from './components/layout/three-column-nav-layout/three-column-nav-layout.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderLayoutComponent,
    TwoColumnNavLayoutComponent,
    ThreeColumnNavLayoutComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
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
