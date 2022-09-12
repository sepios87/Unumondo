import { Component, OnInit } from '@angular/core';
import { SponsorService } from 'src/app/services/sponsor.service';
import { Sponsor } from 'src/app/modeles/sponsor';

@Component({
  selector: 'app-main-sponsors-home',
  templateUrl: './main-sponsors-home.component.html',
  styleUrls: ['./main-sponsors-home.component.scss']
})
export class MainSponsorsHomeComponent implements OnInit {

  mainSponsor: Sponsor[] = [];

  constructor(
    private _sponsorService: SponsorService,
  ) { }

  ngOnInit(): void {
    this._getMainSponsors();
  }

  private async _getMainSponsors(): Promise<void> {
    this.mainSponsor = await this._sponsorService.getMainSponsors();
  }

  trackById = (_: number, item: any): string => item.id;

}
