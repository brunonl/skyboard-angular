import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VMessagesComponent } from './vmessages.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    VMessagesComponent
  ],
  exports: [
    VMessagesComponent
  ]
})
export class VMessagesModule { }
