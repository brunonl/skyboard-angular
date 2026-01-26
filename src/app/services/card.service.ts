import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card';
import { SupabaseService } from './supabase.service';

@Injectable({
	providedIn: 'root',
})
export class CardService {

	constructor(private supabase: SupabaseService) { }

	async getCards(): Promise<Card[]> {
		const { data, error } = await this.supabase.client
			.from('cards')
			.select('*');

		if (error) throw error;
		return data as Card[];
	}

	async addCard(card: Card): Promise<Card> {
		const { data, error } = await this.supabase.client
			.from('cards')
			.insert({
				titulo: card.titulo,
				conteudo: card.conteudo,
				lista: card.lista
			})
			.select()
			.single();

		if (error) throw error;
		return data as Card;
	}

	async updateCard(card: Card): Promise<Card> {
		const { data, error } = await this.supabase.client
			.from('cards')
			.update({
				titulo: card.titulo,
				conteudo: card.conteudo,
				lista: card.lista
			})
			.eq('id', card.id)
			.select()
			.single();

		if (error) throw error;
		return data as Card;
	}

	async deleteCard(id: string): Promise<void> {
		const { error } = await this.supabase.client
			.from('cards')
			.delete()
			.eq('id', id);

		if (error) throw error;
	}
}

