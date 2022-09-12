import { NgModule } from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './core/nav/nav.component';
import { LangselectorComponent } from './core/langselector/langselector.component';
import { AppRoutingModule } from "./app-routing.module";
import { ExpeditionsComponent } from './pages/expeditions/expeditions.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './core/footer/footer.component';
import { VignetteMembreComponent } from './pages/equipe/vignette-membre/vignette-membre.component';
import { EquipeComponent } from './pages/equipe/equipe.component';
import { PartenairesComponent } from './pages/partenaires/partenaires.component';
import { BateauComponent } from './pages/bateau/bateau.component';
import { HeaderComponent } from './shared/header/header.component';
import { MissionsComponent } from './pages/missions/missions.component';
import { ExpeditionComponent } from './pages/expedition/expedition.component';
import { DescriptionComponent } from './shared/description/description.component';
import { NumbersComponent } from './shared/numbers/numbers.component';
import { PedagogieComponent } from './pages/pedagogie/pedagogie.component';
import { MediathequeComponent } from './pages/mediatheque/mediatheque.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ContribuerComponent } from './modals/contribuer/contribuer.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WrongComponent } from './pages/wrong/wrong.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './pages/loading/loading.component';
import {CountUpModule} from "ngx-countup";
import { LazyLoadingBackgroundDirective } from './directives/lazy-loading-background.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConditionalWrapperDirective } from './directives/conditional-wrapper.directive';
import { MentionLegalesComponent } from './pages/mentions-legales/mentions-legales.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { HotToastModule } from '@ngneat/hot-toast';
import { HeaderHomeComponent } from './pages/home/header-home/header-home.component';
import { FormulaireComponent } from './pages/contact/formulaire/formulaire.component';
import { WhoComponent } from './pages/home/who/who.component';
import { MissionsHomeComponent } from './pages/home/missions-home/missions-home.component';
import { PresseMediathequeComponent } from './pages/mediatheque/presse-mediatheque/presse-mediatheque.component';
import { FilmsMediathequeComponent } from './pages/mediatheque/films-mediatheque/films-mediatheque.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FichesPedaComponent } from './pages/pedagogie/fiches-peda/fiches-peda.component';
import { FichesVideoPedaComponent } from './pages/pedagogie/fiches-video-peda/fiches-video-peda.component';
import { SwiperComponent } from './shared/swiper/swiper.component';
import { DetailMediathequeComponent } from './pages/detail-mediatheque/detail-mediatheque.component';
import { MainSponsorsHomeComponent } from './pages/home/main-sponsors-home/main-sponsors-home.component';
import { TeamHomeComponent } from './pages/home/team-home/team-home.component';
import { PedagogyHomeComponent } from './pages/home/pedagogy-home/pedagogy-home.component';
import { TestimonyHomeComponent } from './pages/home/testimony-home/testimony-home.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LangselectorComponent,
    ExpeditionsComponent,
    ContactComponent,
    FooterComponent,
    VignetteMembreComponent,
    EquipeComponent,
    PartenairesComponent,
    BateauComponent,
    HeaderComponent,
    MissionsComponent,
    ExpeditionComponent,
    DescriptionComponent,
    NumbersComponent,
    PedagogieComponent,
    MediathequeComponent,
    ContribuerComponent,
    WrongComponent,
    LoadingComponent,
    LazyLoadingBackgroundDirective,
    ConditionalWrapperDirective,
    MentionLegalesComponent,
    ClickOutsideDirective,
    HeaderHomeComponent,
    TeamHomeComponent,
    FormulaireComponent,
    PedagogyHomeComponent,
    WhoComponent,
    MissionsHomeComponent,
    PresseMediathequeComponent,
    FilmsMediathequeComponent,
    FichesPedaComponent,
    FichesVideoPedaComponent,
    SwiperComponent,
    DetailMediathequeComponent,
    MainSponsorsHomeComponent,
    TestimonyHomeComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxStripeModule.forRoot('pk_test_51KOMk2ApFYENeqShqVoTHFsWdYcS3oEooKeRg9nMdAUB7oLNX8Nkpzot10YQ23K7D3zWCoQPLxvE9RMox8R29hYh00iMmXhhzp'),
        TranslateModule.forRoot({
            defaultLanguage: 'fr-FR',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        CarouselModule,
        BrowserAnimationsModule,
        CountUpModule,
        FontAwesomeModule,
        HotToastModule.forRoot({
          dismissible: true,
          position: 'bottom-center',
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule { }
