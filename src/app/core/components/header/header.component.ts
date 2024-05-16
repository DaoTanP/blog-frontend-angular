import { Component, HostListener } from '@angular/core';
import { DataService } from '@/core/services/data.service';
import { APP_INFO } from '@/shared/constants/app-info.constant';
import { VARIABLE_NAME } from '@/shared/constants/variable-name.constant';
import { UserService } from '@/core/services/user.service';
import { Observable, of } from 'rxjs';
import { User } from '@/core/models/user.model';

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

  public isLoggedIn: Observable<boolean> = of(false);
  public user: Observable<User | null> = of(null);

  constructor(
    private dataService: DataService,
    private userService: UserService
  ) {
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

    this.isLoggedIn = userService.isLoggedIn;
    this.user = userService.user;
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

  logout() {
    this.userService.logout();
  }
}
