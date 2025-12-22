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

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {

	toDoList: Card[] = [];
	doingList: Card[] = [];
	doneList: Card[] = [];

	modalRef?: BsModalRef;

	addForm!: FormGroup;

	constructor(
		private activatedRoute: ActivatedRoute,
		private cardService: CardService,
		private modalService: BsModalService,
		private formBuilder: FormBuilder,
	) { }

	ngOnInit(): void {

		this.toDoList = this.activatedRoute.snapshot.data['cards'];

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
				onEdit:this.updateCardBoardOnCallbackService.bind(this)
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
		switch ( card.lista ) {
			case 'ToDo':
				this.toDoList = this.removeCardFromList(card.id,this.toDoList);
				break;
			case 'Doing':
				this.doingList = this.removeCardFromList(card.id,this.doingList);
				break;
			case 'Done':
				this.doneList = this.removeCardFromList(card.id,this.doneList);
				break;
			default: 
				throw new Error("Error on delete from list callbackDeleted");
				break;
		 }
	}

	updateCardBoardOnCallbackService(card: Card) {
		switch ( card.lista ) {
			case 'ToDo':
				this.toDoList = this.removeCardFromList(card.id,this.toDoList);
				this.addCardToList(card, this.toDoList);
				break;
			case 'Doing':
				this.doingList = this.removeCardFromList(card.id,this.doingList);
				this.addCardToList(card, this.doingList);
				break;
			case 'Done':
				this.doneList = this.removeCardFromList(card.id,this.doneList);
				this.addCardToList(card, this.doneList);
				break;
			default: 
				throw new Error("Error on delete from list callbackDeleted");
				break;
		 }
	}

	goToDoingList(card: Card) {
		let foundCard = this.searchCardFromList(card.id, this.toDoList);
		this.setListOnCard(foundCard as Card, 'Doing');
		this.addCardToList(foundCard as Card, this.doingList)
		this.toDoList = this.removeCardFromList(card.id, this.toDoList);
	}

	goToDoneList(card: Card) {
		let foundCard = this.searchCardFromList(card.id, this.doingList);
		this.setListOnCard(foundCard as Card, 'Done');
		this.doneList.push(foundCard as Card);
		this.doingList = this.removeCardFromList(card.id, this.doingList);
	}

	backToDoList(card: Card) {
		let foundCard = this.searchCardFromList(card.id, this.doingList);
		this.setListOnCard(foundCard as Card, 'ToDo');
		this.addCardToList(foundCard as Card, this.toDoList)
		this.doingList = this.removeCardFromList(card.id, this.doingList);
	}

	backToDoingList(card: Card) {
		let foundCard = this.searchCardFromList(card.id, this.doneList);
		this.setListOnCard(foundCard as Card, 'Doing');
		this.addCardToList(foundCard as Card, this.doingList)
		this.doneList = this.removeCardFromList(card.id, this.doneList);
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

}
