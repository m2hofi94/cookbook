import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSelectAll]'
})
export class SelectAllDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('click')
  selectAll() {
    // access to the native input element
    const nativeEl: HTMLInputElement = this.el.nativeElement.querySelector('input');

    if (nativeEl) {
      if (nativeEl.setSelectionRange) {
        // select the text from start to end
        return nativeEl.setSelectionRange(0, nativeEl.value.length);
      }

      nativeEl.select();
    }
  }

}
