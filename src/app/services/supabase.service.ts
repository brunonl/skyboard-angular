import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

/**
 * SupabaseService - Serviço central para gerenciar a conexão com Supabase
 * 
 * Este serviço inicializa o cliente Supabase uma única vez e o disponibiliza
 * para toda a aplicação via injeção de dependência.
 */
@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        // Cria o cliente Supabase usando as credenciais do environment
        this.supabase = createClient(
            environment.supabaseUrl,
            environment.supabaseKey
        );
    }

    /**
     * Retorna o cliente Supabase para uso em outros services
     */
    get client(): SupabaseClient {
        return this.supabase;
    }

    /**
     * Retorna o usuário atualmente logado (ou null)
     */
    async getCurrentUser(): Promise<User | null> {
        const { data: { user } } = await this.supabase.auth.getUser();
        return user;
    }

    /**
     * Verifica se há uma sessão ativa
     */
    async isAuthenticated(): Promise<boolean> {
        const { data: { session } } = await this.supabase.auth.getSession();
        return session !== null;
    }
}
