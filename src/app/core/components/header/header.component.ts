import { DataService } from '@/core/services/data.service';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  protected switchThemeFunction: any = undefined;
  protected setThemeFunction: any = undefined;
  protected getThemeFunction: any = undefined;
  protected isDark: boolean = false;
  protected isScrolled: boolean = false;

  constructor(private dataService: DataService) {
    this.switchThemeFunction = this.dataService.getData('switchTheme');
    this.setThemeFunction = this.dataService.getData('setTheme');
    this.getThemeFunction = this.dataService.getData('getTheme');
    this.isDark = this.getTheme();
  }

  @HostListener('window:scroll')
  scrollEvent() {
    window.scrollY >= 20 ? (this.isScrolled = true) : (this.isScrolled = false);
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
