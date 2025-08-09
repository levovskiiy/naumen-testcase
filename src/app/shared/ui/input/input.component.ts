import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  public label = input('');
  public placeholder = input('');
  public type = input<'text' | 'email'>('text');
  public clearable = input(false);
  public disabled = input(false);

  public value = signal('');

  public writeValue(obj: any): void {
    this.value.set(obj == null ? '' : String(obj));
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }

  public clear() {
    this.value.set('');
    this.onChange('');
  }

  protected onChange = (v: any) => {
  };
  protected onTouched = () => {
  };

}
