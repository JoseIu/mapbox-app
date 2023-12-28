import { Component } from '@angular/core';

@Component({
  selector: 'counter-component',
  standalone: true,
  // imports: [CommonModule],
  templateUrl: './counter-component.component.html',
  styleUrls: ['./counter-component.component.scss'],
})
export class CounterComponentComponent {
  public counter: number = 10;
}
