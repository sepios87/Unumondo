import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private _elementRef: ElementRef) {}

  @Output() clickOutside: EventEmitter<any> = new EventEmitter();

  /**
   * Désactiver le clic droit sur le site
   * @param {Event} targetElement
   */
  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement: Event) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }

}
