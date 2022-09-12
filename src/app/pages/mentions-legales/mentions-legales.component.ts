import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  selector: 'app-mention-legales',
  templateUrl: './mentions-legales.component.html',
  styleUrls: ['./mentions-legales.component.scss']
})
export class MentionLegalesComponent implements OnInit {

  constructor(
    private _titleService: Title,
    private _translate: TranslateService
  ) { }

  async ngOnInit(): Promise<void> {
    this._titleService.setTitle(await firstValueFrom(this._translate.get('title.legal')) + ' - Unu mondo');
  }

}
