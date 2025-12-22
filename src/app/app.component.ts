import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

/**
 * AppComponent - Componente raiz da aplicação
 * 
 * MUDANÇA: O login automático foi removido.
 * Com Supabase, a sessão é gerenciada automaticamente.
 * Se o usuário já logou antes, a sessão será restaurada automaticamente.
 * 
 * Para adicionar uma tela de login, você pode:
 * 1. Criar um componente de login
 * 2. Verificar se há sessão ativa no ngOnInit
 * 3. Redirecionar para login se não houver sessão
 */
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

	constructor(
		private loginService: LoginService
	) { }

	async ngOnInit(): Promise<void> {
		// Verifica se há uma sessão ativa
		const isLoggedIn = await this.loginService.isLoggedIn();

		if (isLoggedIn) {
			console.log('Usuário já está logado!');
		} else {
			console.log('Usuário não está logado.');
			// TODO: Implementar redirecionamento para página de login
			// Por enquanto, vamos trabalhar sem autenticação para testar o Supabase
		}
	}
}

