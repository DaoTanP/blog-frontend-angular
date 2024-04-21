import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent implements OnInit {
  @Input()
  public class: string = '';

  @Input()
  public style: string = '';

  @ViewChild('templateToRenderWithoutWrapper', { static: true })
  template!: TemplateRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
    this.viewContainerRef.element.nativeElement.remove();
  }
}
