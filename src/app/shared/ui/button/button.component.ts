import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public appearance = input<'primary' | 'secondary' | 'ghost'>('primary');
  public disabled = input(false);
  public loading = input(false);
}
