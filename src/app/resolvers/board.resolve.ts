import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Card } from "../interfaces/card";
import { CardService } from "../services/card.service";

/**
 * BoardResolver - Carrega os cards antes de renderizar a rota
 * 
 * MUDANÇA: Agora retorna Promise<Card[]> ao invés de Observable<Card[]>
 * O Angular Router suporta tanto Promises quanto Observables em resolvers
 */
@Injectable({
    providedIn: 'root'
})
export class BoardResolver  {

    constructor(private cardService: CardService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Card[]> {
        return this.cardService.getCards();
    }
}
