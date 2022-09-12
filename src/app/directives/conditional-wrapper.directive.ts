import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appConditionalWrapper]'
})
export class ConditionalWrapperDirective implements AfterViewInit {

  @Input() isDisplay: boolean = true;
  @Input() newElement: string = "div";

  constructor(
    private readonly elementRef: ElementRef
  ) { }

  // TODO cette directive ne copie pas les évenements du DOM
  ngAfterViewInit(): void {
    // remplace un élément parent suivant une condition d'affichage
    if (!this.isDisplay) {
      const nativEl = this.elementRef.nativeElement;
      const newContainer = document.createElement(this.newElement);

      // Replacer tous les enfants
      while (nativEl.childNodes.length > 0) {
        newContainer.appendChild(nativEl.childNodes[0]);
      }

      // Recopier tous les attributs
      const attributes = Array.prototype.slice.call(nativEl.attributes);
      attributes.forEach((a: HTMLElement) => {
        newContainer.setAttribute(a.nodeName, a.nodeValue ?? '')
      });
      
      nativEl.replaceWith(newContainer);
    }
  }

}
