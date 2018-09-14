import { RouterModule, Routes } from "@angular/router";
import { SurahsListComponent } from "../app/surahs-list/surahs-list.component";
import { QuranViewComponent } from "../app/quran-view/quran-view.component";
import { SettingsComponent } from "../app/settings/settings.component";

export const routes: Routes = [
  { path: "settings", component: SettingsComponent },
  { path: "surah/:id", component: QuranViewComponent },
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
