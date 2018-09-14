import { Component, OnInit } from "@angular/core";
import { ContentService, Verse, Surah } from "../../services/content-service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-quran-view",
  templateUrl: "./quran-view.component.html",
  styleUrls: ["./quran-view.component.css"]
})
export class QuranViewComponent implements OnInit {
  verses: Verse[] | null = null;
  surah: Surah | null = null;

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.route.params.subscribe(async params => {
      const id = +params.id;
      this.surah =
        (await this.contentService.getSurahs()).find(x => x.id === id) || null;
      this.verses = await this.contentService.getVerses(id);
    });
  }

  get hasBismillah() {
    return this.surah !== null && this.surah.displayBismillah;
  }
}
