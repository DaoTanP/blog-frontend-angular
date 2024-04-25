import { Component } from '@angular/core';
import { DataService } from './core/services/data.service';
import { VARIABLE_NAME } from './shared/constants/variable-name.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  storedTheme = localStorage.getItem('theme');

  constructor(private dataService: DataService) {
    this.setTheme(this.getPreferredTheme());
    this.dataService.setData(
      VARIABLE_NAME.switchThemeFunction,
      this.switchTheme
    );
    this.dataService.setData(VARIABLE_NAME.setThemeFunction, this.setTheme);
    this.dataService.setData(VARIABLE_NAME.getThemeFunction, this.getTheme);
  }

  getPreferredTheme() {
    if (this.storedTheme) return this.storedTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  getTheme() {
    let html = document.querySelector('html');
    if (!html) return undefined;

    return html.dataset['bsTheme'];
  }

  setTheme = function (theme: string) {
    // if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    //   document.documentElement.setAttribute('data-bs-theme', 'dark')
    // else
    //   document.documentElement.setAttribute('data-bs-theme', theme)

    let html = document.querySelector('html');
    if (!html) return;

    if (
      theme === 'auto' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      html.dataset['bsTheme'] = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      html.dataset['bsTheme'] = theme;
      localStorage.setItem('theme', theme);
    }
  };

  switchTheme() {
    let html = document.querySelector('html');
    if (!html) return;

    let theme = 'auto';

    html.dataset['bsTheme'] == 'light' ? (theme = 'dark') : (theme = 'light');

    html.dataset['bsTheme'] = theme;
    localStorage.setItem('theme', theme);
  }
}
