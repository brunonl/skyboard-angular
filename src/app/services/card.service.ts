import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card';
import { SupabaseService } from './supabase.service';

/**
 * CardService - Gerencia operações CRUD de cards via Supabase
 * 
 * MUDANÇA IMPORTANTE: 
 * Antes usávamos HttpClient que retorna Observable.
 * Agora usamos Supabase SDK que retorna Promise.
 * 
 * Os métodos agora são async e retornam Promise<Card[]> ou Promise<Card>
 */
@Injectable({
	providedIn: 'root',
})
export class CardService {

	constructor(private supabase: SupabaseService) { }

	/**
	 * Busca todos os cards do banco
	 * 
	 * Equivalente SQL: SELECT * FROM cards
	 */
	async getCards(): Promise<Card[]> {
		const { data, error } = await this.supabase.client
			.from('cards')
			.select('*');

		if (error) throw error;
		return data as Card[];
	}

	/**
	 * Adiciona um novo card
	 * 
	 * Equivalente SQL: INSERT INTO cards (titulo, conteudo, lista) VALUES (...)
	 */
	async addCard(card: Card): Promise<Card> {
		const { data, error } = await this.supabase.client
			.from('cards')
			.insert({
				titulo: card.titulo,
				conteudo: card.conteudo,
				lista: card.lista
			})
			.select() // Retorna o card inserido com o ID gerado
			.single();

		if (error) throw error;
		return data as Card;
	}

	/**
	 * Atualiza um card existente
	 * 
	 * Equivalente SQL: UPDATE cards SET titulo=?, conteudo=?, lista=? WHERE id=?
	 */
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

	/**
	 * Remove um card
	 * 
	 * Equivalente SQL: DELETE FROM cards WHERE id=?
	 */
	async deleteCard(id: string): Promise<void> {
		const { error } = await this.supabase.client
			.from('cards')
			.delete()
			.eq('id', id);

		if (error) throw error;
	}
}

