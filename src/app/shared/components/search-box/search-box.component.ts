import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit {

  private debounce = new Subject<string>();

  @ViewChild('txtInput')
  public txtInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  // @Output()
  // public onValue: EventEmitter<string> = new EventEmitter()

  @Output()
  public onDebounce = new EventEmitter<string>()

  ngOnInit(): void {
    this.debounce
    .pipe(
      debounceTime(800)
    )
    .subscribe(
      value =>
        this.onDebounce.emit(value)
    )
  }

  onKeyPress(){
    const newCountry = this.txtInput.nativeElement.value;

    if(newCountry.length === 0) return;

    this.debounce.next(newCountry)
  }

  // emitValue(): void {

  //   const newCountry = this.txtInput.nativeElement.value;

  //   if(newCountry.length === 0) return;

  //   this.onValue.emit(newCountry)

  //   this.txtInput.nativeElement.value = '';

  // }



}

