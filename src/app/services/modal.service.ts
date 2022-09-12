import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _displayContribuer: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');

  watchContribuer(): Observable<'open' | 'close'> {
    return this._displayContribuer.asObservable();
  }

  openContribuer(): void {
    this._displayContribuer.next('open');
    document.body.classList.add("stop-scrolling");
  }

  closeContribuer(): void {
    this._displayContribuer.next('close');
    document.body.classList.remove("stop-scrolling");
  }
}
