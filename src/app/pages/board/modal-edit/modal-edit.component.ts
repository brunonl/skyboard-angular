import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Card } from 'src/app/interfaces/card';
import { CardService } from 'src/app/services/card.service';

@Component({
    selector: 'app-modal-edit',
    templateUrl: './modal-edit.component.html',
    standalone: false
})
export class ModalEditComponent implements OnInit {

	@ViewChild('focusInput') contentInput!: ElementRef<HTMLInputElement>;

	editForm!: FormGroup;
	card!: Card;
	onEdit!: Function;

	constructor(
		public bsModalRef: BsModalRef,
		private formBuilder: FormBuilder,
		private cardService: CardService,
	) { }

	ngOnInit(): void {
		this.editForm = this.formBuilder.group({
			titulo: ['', Validators.required],
			conteudo: ['', Validators.required]
		})

		this.editForm.controls['titulo'].setValue(this.card.titulo);
		this.editForm.controls['conteudo'].setValue(this.card.conteudo);
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.contentInput.nativeElement.focus();
		}, 0);
	}

	/**
	 * Edita um card usando async/await
	 */
	async editCard() {
		if (this.editForm.valid) {
			try {
				let card: Card = this.editForm.getRawValue();
				card.lista = this.card.lista;
				card.id = this.card.id;

				const updatedCard = await this.cardService.updateCard(card);

				this.bsModalRef.hide();
				this.onEdit(updatedCard);
			} catch (error: any) {
				console.error('Erro ao editar card:', error);
				throw new Error(error.message);
			}
		}
	}

}

