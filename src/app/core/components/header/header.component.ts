import { Component, HostListener } from '@angular/core';
import { DataService } from '@/core/services/data.service';
import { APP_INFO } from '@/shared/constants/app-info.constant';
import { VARIABLE_NAME } from '@/shared/constants/variable-name.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  protected appName: string = APP_INFO.appName;
  protected switchThemeFunction: any = undefined;
  protected setThemeFunction: any = undefined;
  protected getThemeFunction: any = undefined;
  protected isDark: boolean = false;
  protected isScrolled: boolean = false;

  constructor(private dataService: DataService) {
    this.switchThemeFunction = this.dataService.getData(
      VARIABLE_NAME.switchThemeFunction
    );
    this.setThemeFunction = this.dataService.getData(
      VARIABLE_NAME.setThemeFunction
    );
    this.getThemeFunction = this.dataService.getData(
      VARIABLE_NAME.getThemeFunction
    );
    this.isDark = this.getTheme();
  }

  @HostListener('window:scroll')
  scrollEvent() {
    window.scrollY >= 10 ? (this.isScrolled = true) : (this.isScrolled = false);
  }

  toggleTheme() {
    this.switchThemeFunction();
    this.isDark = this.getTheme();
  }

  setTheme(theme: string) {
    this.setThemeFunction(theme);
    this.isDark = this.getTheme();
  }

  getTheme() {
    return this.getThemeFunction() == 'dark' ? true : false;
  }
}
