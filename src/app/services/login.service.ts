import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User, Session } from '@supabase/supabase-js';

/**
 * LoginService - Gerencia autenticação via Supabase Auth
 * 
 * MUDANÇA IMPORTANTE:
 * Antes usávamos um endpoint customizado /login com JWT manual.
 * Agora usamos Supabase Auth que gerencia tokens automaticamente.
 * 
 * Não precisamos mais armazenar tokens no sessionStorage - 
 * o Supabase SDK faz isso automaticamente!
 */
@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(private supabase: SupabaseService) { }

	/**
	 * Faz login com email e senha
	 * 
	 * O Supabase armazena automaticamente o token da sessão
	 */
	async login(email: string, password: string): Promise<{ user: User | null; session: Session | null }> {
		const { data, error } = await this.supabase.client.auth
			.signInWithPassword({ email, password });

		if (error) throw error;
		return data;
	}

	/**
	 * Cria uma nova conta de usuário
	 */
	async signUp(email: string, password: string): Promise<{ user: User | null; session: Session | null }> {
		const { data, error } = await this.supabase.client.auth
			.signUp({ email, password });

		if (error) throw error;
		return data;
	}

	/**
	 * Faz logout do usuário
	 */
	async logout(): Promise<void> {
		const { error } = await this.supabase.client.auth.signOut();
		if (error) throw error;
	}

	/**
	 * Verifica se há sessão ativa
	 */
	async isLoggedIn(): Promise<boolean> {
		const { data: { session } } = await this.supabase.client.auth.getSession();
		return session !== null;
	}

	/**
	 * Retorna o usuário atual
	 */
	async getCurrentUser(): Promise<User | null> {
		const { data: { user } } = await this.supabase.client.auth.getUser();
		return user;
	}

	/**
	 * @deprecated Use isLoggedIn() ao invés disso
	 * Mantido para compatibilidade com código legado
	 */
	getAuthToken(): string | null {
		// O Supabase gerencia tokens internamente
		// Este método existe só para compatibilidade temporária
		return 'managed-by-supabase';
	}
}
