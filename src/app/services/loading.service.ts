import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ExpeditionService } from './expedition.service';
import { AssociationService } from './association.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loadingBehavhior: BehaviorSubject<number> = new BehaviorSubject(0);
  private _isLoading: boolean = false;
  private _previusUrl?: string;

  get $loadingObservable(): Observable<number> {
    return this._loadingBehavhior.asObservable();
  }

  get isLoading() { return this._isLoading };

  constructor(
    private _expeditionService: ExpeditionService,
    private _associationService: AssociationService,
    private _router: Router,
    private _location: Location,
  ) { }

  /**
   * Redirige vers la page loading si les données ne sont pas préchargées
   */
  loadData(): void {
    if (this._isLoading) return;
    // Récuperer l'url actuelle avant de rediriger (elle devient donc l'url précédente)
    this._previusUrl = this._router.url;
    this._router.navigateByUrl('/loading');
  }

  /**
   * Charge les données
   */
  async lanchLoadData(): Promise<void> {
    this._isLoading = true;

    await this._expeditionService.getExpeditions();
    this._loadingBehavhior.next(50);
    await this._associationService.getAssociation();
    this._loadingBehavhior.next(100);

    // Si il y a un url précédente, revenir sur la page en question
    if (this._previusUrl) {
      this._location.back();
    } else {
      this._router.navigateByUrl('/');
    }
  }

}
