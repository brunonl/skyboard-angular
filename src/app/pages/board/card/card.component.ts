import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/interfaces/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  @Input() card?: Card;

  @Output() goToNext = new EventEmitter<Card>();
  @Output() goToPrev = new EventEmitter<Card>();
  @Output() goDelete = new EventEmitter<Card>();
  @Output() goEdit = new EventEmitter<Card>();
  @Output() goOpen = new EventEmitter<Card>();
  
  
  constructor() { }

  ngOnInit(): void {

  }

  toNext() {
    this.goToNext.emit(this.card);
  }

  toPrev() {
    this.goToPrev.emit(this.card);
  }

  toDelete() {
    this.goDelete.emit(this.card);
  }

  toEdit() {
    this.goEdit.emit(this.card);
  }

  toOpen() {
    this.goOpen.emit(this.card);
  }

}
