import { Routes } from "@angular/router";
import { SurahsListComponent } from "../app/surahs-list/surahs-list.component";
import { QuranViewComponent } from "../app/quran-view/quran-view.component";
import { SettingsComponent } from "../app/settings/settings.component";
import { ResultsComponent } from "src/app/results/results.component";

export const routes: Routes = [
  { path: "settings", component: SettingsComponent },
  { path: "results", component: ResultsComponent },
  { path: "surah/:surah", component: QuranViewComponent },
  { path: "surah/:surah/verse/:verse", component: QuranViewComponent },
  {
    path: "surahs",
    component: SurahsListComponent,
    data: { title: "Surahs List" }
  },
  {
    path: "",
    redirectTo: "/surahs",
    pathMatch: "full"
  }
  // { path: "**", component: PageNotFoundComponent }
];
