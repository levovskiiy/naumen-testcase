import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<T> implements ControlValueAccessor {
  public options = input.required<{ label: string, value: T }[]>();
  public label = input('');
  public placeholder = input('');
  public clearable = input(false);

  public value = signal<T | null>(null);

  public writeValue(obj: any): void {
    this.value.set(obj);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public clear() {
    this.value.set(null);
    this.onChange(null);
  }

  public onSelect(event: Event) {
    const el = event.target as HTMLSelectElement;
    const value = Number(el.value);
    const option = this.options()[value];
    const selected = option ? option.value : null;
    this.value.set(selected);
    this.onChange(selected);
  }

  protected onChange = (v: any) => {
  };
  protected onTouched = () => {
  };

}
