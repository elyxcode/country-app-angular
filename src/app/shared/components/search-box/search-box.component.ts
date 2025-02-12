import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {

  @ViewChild('txtInput')
  public txtInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter()

  emitValue(): void {

    const newCountry = this.txtInput.nativeElement.value;

    if(newCountry.length === 0) return;

    this.onValue.emit(newCountry)

    this.txtInput.nativeElement.value = '';

  }

}

