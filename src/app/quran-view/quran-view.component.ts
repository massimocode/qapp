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
      const surahId = +params.surah;
      this.surah = (await this.contentService.getSurahs()).find(
        x => x.id === surahId
      )!;
      this.verses = await this.contentService.getVerses(surahId);

      if (params.verse) {
        const verseId = +params.verse;
        setTimeout(() => {
          const verse = document.getElementById(`verse_${verseId}`);
          if (verse) {
            verse.scrollIntoView();
          }
        });
      }
    });
  }

  get hasBismillah() {
    return this.surah !== null && this.surah.displayBismillah;
  }
}
