import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { CardComponent } from './card/card.component';
import { ModalAddComponent } from './modal-add/modal-add.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { ModalEditComponent } from './modal-edit/modal-edit.component';
import { ModalOpenComponent } from './modal-open/modal-open.component';
import { VMessagesModule } from 'src/app/shared/components/vmessages/vmessages.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    BoardComponent,
    CardComponent,
    ModalAddComponent,
    ModalDeleteComponent,
    ModalEditComponent,
    ModalOpenComponent
  ],
  exports: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    VMessagesModule,
    DragDropModule
  ]
})
export class BoardModule { }
