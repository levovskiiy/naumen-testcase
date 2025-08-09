import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]',
  standalone: true,
})
export class RepeatDirective {
  public appRepeat = input(1);

  private readonly _templateRef = inject(TemplateRef);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      this._viewContainerRef.clear();

      for (let index = 0; index < this.appRepeat(); index++) {
        const context = {
          $implicit: index,
          index,
          count: this.appRepeat(),
          first: index == 0,
          last: index === this.appRepeat() - 1,
          event: index % 2 === 0,
          odd: index % 2 !== 0,
        };

        this._viewContainerRef.createEmbeddedView(this._templateRef, context);
      }
    });
  }
}
