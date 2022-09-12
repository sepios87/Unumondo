import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ExpeditionsComponent } from './pages/expeditions/expeditions.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EquipeComponent } from "./pages/equipe/equipe.component";
import { PartenairesComponent } from './pages/partenaires/partenaires.component';
import { BateauComponent } from './pages/bateau/bateau.component';
import { MissionsComponent } from './pages/missions/missions.component';
import { ExpeditionComponent } from './pages/expedition/expedition.component';
import { MediathequeComponent } from './pages/mediatheque/mediatheque.component';
import { PedagogieComponent } from './pages/pedagogie/pedagogie.component';
import { WrongComponent } from './pages/wrong/wrong.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { MentionLegalesComponent } from './pages/mentions-legales/mentions-legales.component';
import { DetailMediathequeComponent } from './pages/detail-mediatheque/detail-mediatheque.component';

const routes: Routes = [
  {
    path: 'loading',
    component: LoadingComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'expeditions',
    component: ExpeditionsComponent
  },
  {
    path: 'expedition/:id',
    component: ExpeditionComponent
  },
  {
    path: 'team',
    component: EquipeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'partners',
    component: PartenairesComponent
  },
  {
    path: 'boat',
    component: BateauComponent
  },
  {
    path: 'missions',
    component: MissionsComponent
  },
  {
    path: 'expedition',
    component: ExpeditionComponent
  },
  {
    path: 'pedagogy',
    component: PedagogieComponent
  },
  {
    path: 'gallery',
    component: MediathequeComponent
  },
  {
    path: 'gallery/:id',
    component: DetailMediathequeComponent
  },
  {
    path: 'mentions-legales',
    component: MentionLegalesComponent
  },
  {
    path: '**',
    component: WrongComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
