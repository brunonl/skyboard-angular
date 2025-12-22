import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * AuthHeaderInterceptor - Interceptor de autenticação
 * 
 * NOTA: Com Supabase, este interceptor não é mais necessário para 
 * as chamadas ao banco de dados, pois o SDK gerencia tokens automaticamente.
 * 
 * Mantido apenas para compatibilidade com possíveis outras APIs externas.
 * Pode ser removido completamente se sua aplicação só usar Supabase.
 */
@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        // Supabase gerencia autenticação automaticamente
        // Este interceptor agora é um pass-through simples
        return next.handle(request);
    }
}
