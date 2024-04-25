import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {
  @Input()
  public class: string = '';
  @Input()
  public width: string = '2em';
  @Input()
  public height: string = '2em';
}
