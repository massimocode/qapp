import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { SurahsListComponent } from "./surahs-list/surahs-list.component";
import {
  ContentService,
  ContentServiceImplementation
} from "../services/content-service";
import {
  QuranApiProvider
  // StubQuranApiProvider
} from "../providers/quran-api-provider";
import { SettingsComponent } from "./settings/settings.component";
import { QuranViewComponent } from "./quran-view/quran-view.component";
import {
  StorageProvider,
  BrowserStorageProvider
  // MockStorageProvider
} from "../providers/storage-provider";
import { QuranDotComApiProvider } from "../providers/quran-dot-com-api-provider";
import { routes } from "../routing/routes";
import {
  SettingsService,
  SettingsServiceImplementation
} from "../services/settings-service";
import {
  StyleProvider,
  BrowserStyleProvider
} from "../providers/style-provider";
import { ResultsComponent } from "./results/results.component";
import {
  ClipboardProvider,
  BrowserClipboardProvider
} from "src/providers/clipboard-provider";
import { JuzsListComponent } from "./juzs-list/juzs-list.component";

@NgModule({
  declarations: [
    AppComponent,
    SurahsListComponent,
    JuzsListComponent,
    SettingsComponent,
    QuranViewComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: ContentService, useClass: ContentServiceImplementation },
    { provide: SettingsService, useClass: SettingsServiceImplementation },
    {
      provide: QuranApiProvider,
      useClass: QuranDotComApiProvider /* Or StubQuranApiProvider */
    },
    {
      provide: StorageProvider,
      useClass: BrowserStorageProvider /* or MockStorageProvider */
    },
    { provide: StyleProvider, useClass: BrowserStyleProvider },
    { provide: ClipboardProvider, useClass: BrowserClipboardProvider }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
