import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css',
  standalone: false,
})
export class LoadingSpinnerComponent {

  @Input()
  public loadingMessage: string = ''
}
