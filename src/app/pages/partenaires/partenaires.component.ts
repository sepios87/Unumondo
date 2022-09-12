import { Component, OnInit } from '@angular/core';
import { CategorieSponsors } from 'src/app/modeles/categorieSponsors';
import { Sponsor } from 'src/app/modeles/sponsor';
import { SponsorService } from 'src/app/services/sponsor.service';
import { Meta, Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.scss']
})
export class PartenairesComponent implements OnInit {

  sponsors: Sponsor[] = [];
  mecenes: Sponsor[] = [];
  categories: CategorieSponsors[] = [];

  constructor(
    private _sponsorService: SponsorService,
    private _titleService: Title,
    private _translate: TranslateService,
    private _metaService: Meta
  ) { }

  async ngOnInit(): Promise<void> {
    this._titleService.setTitle(await firstValueFrom(this._translate.get('title.partner')) + ' - Unu mondo');
    this._metaService.addTags([
      {
        name: 'description',
        content: await firstValueFrom(this._translate.get('description.partners'))
      },
      {
        name: 'robots',
        content: 'index, follow'
      }
    ]);
    this._getSponsors();
    this._getCategories();
  }

  private _getSponsors(): void {
    this._sponsorService.getSponsors().then(sponsors => {
      this.sponsors = sponsors.filter(s => !s.estMecene);
      this.mecenes = sponsors.filter(s => s.estMecene);
    });
  }

  private _getCategories(): void {
    this._sponsorService.getCategories().then(categories => this.categories = categories);
  }

  getMainSponsor(): Sponsor[] {
    return this.sponsors.filter(e => e.estMisEnAvant);
  }

  isEmptyCategorie(categorieId: string): boolean {
    return this.sponsors.filter(e => e.categorieId == categorieId && !e.estMisEnAvant).length == 0;
  }

  getSponsorWithCategorie(categorieId: string): Sponsor[] {
    return this.sponsors.filter(e => e.categorieId == categorieId && !e.estMisEnAvant);
  }

  trackById = (_: number, item: any): string => item.id;

}
