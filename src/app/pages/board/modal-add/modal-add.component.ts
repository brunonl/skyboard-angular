import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Card } from 'src/app/interfaces/card';
import { CardService } from 'src/app/services/card.service';

@Component({
	selector: 'app-modal-add',
	templateUrl: './modal-add.component.html'
})
export class ModalAddComponent implements OnInit {

	@ViewChild('focusInput') contentInput!: ElementRef<HTMLInputElement>;

	addForm!: FormGroup;
	onAdd!: Function;
	toDoList!: Card[];

	constructor(
		public bsModalRef: BsModalRef,
		private formBuilder: FormBuilder,
		private cardService: CardService,
	) { }

	ngOnInit(): void {
		this.addForm = this.formBuilder.group({
			titulo: ['', Validators.required],
			conteudo: ['', Validators.required]
		})
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.contentInput.nativeElement.focus();
		}, 0);
	}

	/**
	 * Adiciona um card usando async/await
	 * 
	 * ANTES: usávamos .subscribe({ next: ..., error: ... })
	 * AGORA: usamos try/catch com async/await - mais limpo!
	 */
	async addCard() {
		if (this.addForm.valid) {
			try {
				let card: Card = this.addForm.getRawValue();
				card.lista = "ToDo";

				const savedCard = await this.cardService.addCard(card);

				this.bsModalRef.hide();
				this.onAdd(savedCard, this.toDoList);
			} catch (error: any) {
				console.error('Erro ao adicionar card:', error);
				throw new Error(error.message);
			}
		}
	}

}

