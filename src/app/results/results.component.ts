import { Component } from "@angular/core";
import { ContentService } from "src/services/content-service";
import { results } from "src/static-data/results";
import { ClipboardProvider } from "src/providers/clipboard-provider";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.css"]
})
export class ResultsComponent {
  public feelPage = "";
  public feelText = "";
  public tarkPage = "";
  public tarkText = "";

  constructor(
    private contentService: ContentService,
    private clipboardProvider: ClipboardProvider
  ) {}

  async refreshFeel() {
    const feelPage = this.feelPage;
    if (!feelPage) {
      this.feelText = "";
      return;
    }
    this.feelText = "loading";
    const pageResult = results.get(+feelPage)!;
    const surahs = await this.contentService.getSurahs();
    const verses = await this.contentService.getVerses(pageResult.surahId);
    if (this.feelPage !== feelPage) {
      return;
    }
    const surah = surahs.find(x => x.id === pageResult.surahId)!;
    const verse = verses.find(x => x.id === pageResult.verse)!;
    this.feelText = `سورة ${surah.name} - ${verse.text}`;
  }

  async refreshTark() {
    const tarkPage = this.tarkPage;
    if (!tarkPage) {
      this.tarkText = "";
      return;
    }
    this.tarkText = "loading";
    const pageResult = results.get(+tarkPage)!;
    const surahs = await this.contentService.getSurahs();
    const verses = await this.contentService.getVerses(pageResult.surahId);
    if (this.tarkPage !== tarkPage) {
      return;
    }
    const surah = surahs.find(x => x.id === pageResult.surahId)!;
    const verse = verses.find(x => x.id === pageResult.verse)!;
    this.tarkText = `سورة ${surah.name} - ${verse.text}`;
  }

  copy(value: string) {
    this.clipboardProvider.copy(value);
  }

  copyAll() {
    this.clipboardProvider.copy(`=== فعل ===
${this.feelText}

=== ترک ===
${this.tarkText}`);
  }
}
