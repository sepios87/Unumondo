import { Component, ElementRef, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mission } from 'src/app/modeles/mission';
import { AssociationService } from 'src/app/services/association.service';
import {Meta, Title} from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit, AfterViewInit {

  @ViewChildren("missionSection") missionsSections!: QueryList<ElementRef>;

  missions: Mission[] = [];

  constructor(
    private _associationService: AssociationService,
    private _route: ActivatedRoute,
    private _titleService: Title,
    private _translate: TranslateService,
    private _metaService: Meta
  ) { }

  async ngOnInit(): Promise<void> {
    this._titleService.setTitle(await firstValueFrom(this._translate.get('title.missions')) + ' - Unu mondo');
    this._metaService.addTags([
      {
        name: 'description',
        content: await firstValueFrom(this._translate.get('description.missions'))
      },
      {
        name: 'robots',
        content: 'index, follow'
      }
    ]);
    this._getMissions();
  }

  ngAfterViewInit(): void {
    const id = this._route.snapshot.fragment;
    if (id) {
      this.missionsSections.changes.subscribe(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      });
    }
  }

  private _getMissions(): void {
    this._associationService.getMissions().then(missions =>
      this.missions = missions
    );
  }

}
