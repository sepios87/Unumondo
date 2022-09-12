import { Component, OnInit } from '@angular/core';
import { Membre } from 'src/app/modeles/membre';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.component.html',
  styleUrls: ['./team-home.component.scss']
})
export class TeamHomeComponent implements OnInit {

  members: Membre[] = [];
  membersCount: number = 0;

  constructor(
    private _memberService: MembreService,
  ) { }

  ngOnInit(): void {
    this._getMembres();
  }

  private _getMembres(): void {
    this._memberService.getMembres().then(membres => {
      this.membersCount = membres.length - 8;
      this.members = membres.filter(e => e.estBenevole).slice(0, 8);
    });
  }

  trackById = (_: number, item: any): string => item.id;

}
