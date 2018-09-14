import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { SurahsListComponent } from "./surahs-list/surahs-list.component";
import {
  ContentService,
  ContentServiceImplementation
} from "../services/content-service";
import {
  QuranApiProvider,
  MockQuranApiProvider
} from "../providers/quran-api-provider";
import { SettingsComponent } from "./settings/settings.component";
import { QuranViewComponent } from "./quran-view/quran-view.component";
import {
  StorageProvider,
  BrowserStorageProvider,
  // MockStorageProvider
} from "../providers/storage-provider";
// import { QuranDotComApiProvider } from "../providers/quran-dot-com-api-provider";
import { routes } from "../routing/routes";
import {
  SettingsService,
  SettingsServiceImplementation
} from "../services/settings-service";
import {
  StyleProvider,
  BrowserStyleProvider
} from "../providers/style-provider";

@NgModule({
  declarations: [
    AppComponent,
    SurahsListComponent,
    SettingsComponent,
    QuranViewComponent
  ],
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes)],
  providers: [
    { provide: ContentService, useClass: ContentServiceImplementation },
    { provide: SettingsService, useClass: SettingsServiceImplementation },
    { provide: QuranApiProvider, useClass: MockQuranApiProvider /* Or QuranDotComApiProvider */ },
    { provide: StorageProvider, useClass: BrowserStorageProvider /* or MockStorageProvider */ },
    { provide: StyleProvider, useClass: BrowserStyleProvider }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
