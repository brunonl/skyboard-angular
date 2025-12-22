import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { BoardResolver } from './resolvers/board.resolve';

const routes: Routes = [
	{
		path: '**',
		component: BoardComponent,
		resolve: {
            cards: BoardResolver
        }
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
