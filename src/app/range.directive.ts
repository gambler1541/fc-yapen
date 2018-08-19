import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[range]'
})
export class RangeDirective {
  _range: number[];
  @Input() set range(value) {
    this.viewContainer.clear();
    this._range = this.generateRange(value[0], value[1]);

    this._range.forEach(num => {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: num
      });
    });
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  private generateRange(from, to) {
    const res = [];
    let i = from;
    while (i < to + 1) {
      res.push(i);
      i++;
    }
    return res;
  }
}

