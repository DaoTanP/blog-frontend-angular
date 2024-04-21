import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appNoWrapper]',
})
export class NoWrapperDirective implements OnInit {
  private selfElement: HTMLElement;
  @Input('appNoWrapper') removeOn: 'Self' | 'Parent' = 'Parent';

  constructor(private elementRef: ElementRef) {
    this.selfElement = this.elementRef.nativeElement;
  }
  ngOnInit(): void {
    // console.log(this.selfElement.parentElement!.parentElement!.tagName);

    const parentElement: HTMLElement = this.selfElement.parentElement!;
    const grandParentElement: HTMLElement = parentElement.parentElement!;

    if (this.removeOn === 'Self') {
      while (this.selfElement.firstChild)
        parentElement.insertBefore(
          this.selfElement.firstChild,
          this.selfElement
        );

      parentElement.removeChild(this.selfElement);
      return;
    }

    while (parentElement.firstChild)
      grandParentElement.insertBefore(parentElement.firstChild, parentElement);

    grandParentElement.removeChild(parentElement);
  }
}
