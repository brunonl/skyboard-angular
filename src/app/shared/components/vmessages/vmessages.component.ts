import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vmessages',
  templateUrl: './vmessages.component.html'
})
export class VMessagesComponent implements OnInit {

  @Input() text = '';

  constructor() { }

  ngOnInit() {
  }

}
