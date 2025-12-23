import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-vmessages',
    templateUrl: './vmessages.component.html',
    standalone: false
})
export class VMessagesComponent implements OnInit {

  @Input() text = '';

  constructor() { }

  ngOnInit() {
  }

}
