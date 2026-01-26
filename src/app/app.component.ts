import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './services/supabase.service';

/**
 * AppComponent - Componente raiz da aplicação
 */
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	standalone: false
})
export class AppComponent implements OnInit {

	constructor(
		private supabaseService: SupabaseService
	) { }

	async ngOnInit(): Promise<void> {
		const isAuth = await this.supabaseService.isAuthenticated();
		console.log('Session active:', isAuth);
	}
}
