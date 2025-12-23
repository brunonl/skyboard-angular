import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Card } from 'src/app/interfaces/card';
import { CardService } from 'src/app/services/card.service';
import { ModalAddComponent } from './modal-add/modal-add.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { ModalEditComponent } from './modal-edit/modal-edit.component';
import { ModalOpenComponent } from './modal-open/modal-open.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    standalone: false
})
export class BoardComponent implements OnInit {

	toDoList: Card[] = [];
	doingList: Card[] = [];
	doneList: Card[] = [];

	isLoading = false;

	modalRef?: BsModalRef;

	addForm!: FormGroup;

	constructor(
		private activatedRoute: ActivatedRoute,
		private cardService: CardService,
		private modalService: BsModalService,
		private formBuilder: FormBuilder,
	) { }

	ngOnInit(): void {
		const allCards: Card[] = this.activatedRoute.snapshot.data['cards'] || [];

		// Distribuir cards nas listas corretas baseado em card.lista
		this.toDoList = allCards.filter(card => card.lista === 'ToDo' || !card.lista);
		this.doingList = allCards.filter(card => card.lista === 'Doing');
		this.doneList = allCards.filter(card => card.lista === 'Done');
	}

	openModalOpen(card: Card) {
		const initialState: ModalOptions = {
			initialState: {
				card: card,
				onAdd: this.addCardToList.bind(this)
			}
		};
		this.modalRef = this.modalService.show(ModalOpenComponent, initialState);
	}

	openModalAdd() {
		const initialState: ModalOptions = {
			initialState: {
				toDoList: this.toDoList,
				onAdd: this.addCardToList.bind(this)
			}
		};
		this.modalRef = this.modalService.show(ModalAddComponent, initialState);
	}

	openModalEdit(card: Card) {
		const initialState: ModalOptions = {
			initialState: {
				card: card,
				onEdit: this.updateCardBoardOnCallbackService.bind(this)
			}
		};
		this.modalRef = this.modalService.show(ModalEditComponent, initialState);
	}

	openModalDelete(card: Card) {
		const initialState: ModalOptions = {
			initialState: {
				description: 'You have shure that you want remove this card?',
				title: 'Delete Card',
				card: card,
				onDelete: this.deleteCardBoardOnCallbackService.bind(this)
			}
		};
		this.modalRef = this.modalService.show(ModalDeleteComponent, initialState);
	}

	deleteCardBoardOnCallbackService(card: Card) {
		switch (card.lista) {
			case 'ToDo':
				this.toDoList = this.removeCardFromList(card.id, this.toDoList);
				break;
			case 'Doing':
				this.doingList = this.removeCardFromList(card.id, this.doingList);
				break;
			case 'Done':
				this.doneList = this.removeCardFromList(card.id, this.doneList);
				break;
			default:
				throw new Error("Error on delete from list callbackDeleted");
				break;
		}
	}

	updateCardBoardOnCallbackService(card: Card) {
		switch (card.lista) {
			case 'ToDo':
				this.toDoList = this.removeCardFromList(card.id, this.toDoList);
				this.addCardToList(card, this.toDoList);
				break;
			case 'Doing':
				this.doingList = this.removeCardFromList(card.id, this.doingList);
				this.addCardToList(card, this.doingList);
				break;
			case 'Done':
				this.doneList = this.removeCardFromList(card.id, this.doneList);
				this.addCardToList(card, this.doneList);
				break;
			default:
				throw new Error("Error on delete from list callbackDeleted");
				break;
		}
	}

	async goToDoingList(card: Card) {
		let foundCard = this.searchCardFromList(card.id, this.toDoList);
		if (foundCard) {
			this.isLoading = true;
			this.setListOnCard(foundCard, 'Doing');
			await this.cardService.updateCard(foundCard);
			this.addCardToList(foundCard, this.doingList);
			this.toDoList = this.removeCardFromList(card.id, this.toDoList);
			this.isLoading = false;
		}
	}

	async goToDoneList(card: Card) {
		let foundCard = this.searchCardFromList(card.id, this.doingList);
		if (foundCard) {
			this.isLoading = true;
			this.setListOnCard(foundCard, 'Done');
			await this.cardService.updateCard(foundCard);
			this.doneList.push(foundCard);
			this.doingList = this.removeCardFromList(card.id, this.doingList);
			this.isLoading = false;
		}
	}

	async backToDoList(card: Card) {
		let foundCard = this.searchCardFromList(card.id, this.doingList);
		if (foundCard) {
			this.isLoading = true;
			this.setListOnCard(foundCard, 'ToDo');
			await this.cardService.updateCard(foundCard);
			this.addCardToList(foundCard, this.toDoList);
			this.doingList = this.removeCardFromList(card.id, this.doingList);
			this.isLoading = false;
		}
	}

	async backToDoingList(card: Card) {
		let foundCard = this.searchCardFromList(card.id, this.doneList);
		if (foundCard) {
			this.isLoading = true;
			this.setListOnCard(foundCard, 'Doing');
			await this.cardService.updateCard(foundCard);
			this.addCardToList(foundCard, this.doingList);
			this.doneList = this.removeCardFromList(card.id, this.doneList);
			this.isLoading = false;
		}
	}

	searchCardFromList(id: string, list: Card[]) {
		return list.find(card => id === card.id)
	}

	addCardToList(card: Card, list: Card[]) {
		list.push(card);
	}

	setListOnCard(card: Card, value: string) {
		card.lista = value;
	}

	removeCardFromList(id: string, list: Card[]) {
		return list.filter(card => id != card.id);
	}

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	async drop(event: CdkDragDrop<Card[]>, targetList: string) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			const card = event.previousContainer.data[event.previousIndex];
			card.lista = targetList;

			this.isLoading = true;
			try {
				await this.cardService.updateCard(card);
			} catch (error) {
				console.error('Erro ao atualizar card:', error);
			} finally {
				this.isLoading = false;
			}

			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		}
	}

}
