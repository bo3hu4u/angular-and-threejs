import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeroesComponent} from './heroes/heroes.component';
import {DefaultPrefixPipe} from './prefixPipe';
import {FormsModule} from "@angular/forms";
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in-memory-data.service";
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { ThreejsComponent } from './threejs/threejs.component';
import { CubeComponent } from './threejs/cube/cube.component';
import { IntexsoftComponent } from './threejs/intexsoft/intexsoft.component';

@NgModule({
    declarations: [
        AppComponent,
        HeroesComponent,
        DefaultPrefixPipe,
        HeroDetailComponent,
        MessagesComponent,
        DashboardComponent,
        HeroSearchComponent,
        ThreejsComponent,
        CubeComponent,
        IntexsoftComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, { dataEncapsulation: false , delay: 1000}
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
