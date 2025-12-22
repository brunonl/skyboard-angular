import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Card } from 'src/app/interfaces/card';
import { CardService } from 'src/app/services/card.service';

@Component({
	selector: 'app-modal-delete',
	templateUrl: './modal-delete.component.html'
})
export class ModalDeleteComponent implements OnInit {

	title?: string;
	description?: string;
	id!: string;
	card?: Card;
	onDelete!: Function;

	constructor(
		public bsModalRef: BsModalRef,
		private cardService: CardService
	) { }

	ngOnInit(): void {
	}

	/**
	 * Remove um card usando async/await
	 */
	async deleteCard() {
		try {
			await this.cardService.deleteCard(this.card!.id);

			this.bsModalRef.hide();
			this.onDelete(this.card);
		} catch (error: any) {
			console.error('Erro ao deletar card:', error);
			throw new Error(error.message);
		}
	}

}
