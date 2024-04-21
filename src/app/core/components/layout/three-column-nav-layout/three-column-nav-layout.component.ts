import {
  AfterViewInit,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-three-column-nav-layout',
  templateUrl: './three-column-nav-layout.component.html',
  styleUrl: './three-column-nav-layout.component.css',
})
export class ThreeColumnNavLayoutComponent implements AfterViewInit {
  @ViewChild('routerOutlet')
  routerOutlet!: ElementRef<HTMLElement>;
  @ViewChild('layoutMain')
  layoutMain!: ElementRef<HTMLElement>;
  @ViewChild('layoutRightAside')
  layoutRightAside!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const parentElement: HTMLElement =
      this.routerOutlet.nativeElement.parentElement!;
    const mainComponent: HTMLElement = parentElement.querySelector(
      '[threeColumnLayoutMain]'
    ) as HTMLElement;
    const rightAsideComponent: HTMLElement = parentElement.querySelector(
      '[threeColumnLayoutRightAside]'
    ) as HTMLElement;

    this.layoutMain.nativeElement.insertBefore(mainComponent, null);
    this.layoutRightAside.nativeElement.insertBefore(rightAsideComponent, null);

    // mainComponent.remove();
    // rightAsideComponent.remove();
  }
}
