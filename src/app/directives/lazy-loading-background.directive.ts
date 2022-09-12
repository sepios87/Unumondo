import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLazyLoadingBackground]'
})
export class LazyLoadingBackgroundDirective implements AfterViewInit {

  @Input() dataBg? : string;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2
  ) { }

  // S'execute après que la vue soit initiée (donc après que les requetes aient été faites)
  ngAfterViewInit(): void {
    // Vérifie si dataBg existe
    if (this.dataBg) {
      // Leger timeout pour laisser aux autres élément de s'afficher
      setTimeout(() => {
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', `url(${this.dataBg})`);
      }, 100);
    }
  }
}