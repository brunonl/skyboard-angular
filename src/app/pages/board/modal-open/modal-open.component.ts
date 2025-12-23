import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Card } from 'src/app/interfaces/card';

@Component({
    selector: 'app-modal-open',
    templateUrl: './modal-open.component.html',
    standalone: false
})
export class ModalOpenComponent implements OnInit {

	card!: Card;

	constructor(
		public bsModalRef: BsModalRef,
	) { }

	ngOnInit(): void {

	}
}
