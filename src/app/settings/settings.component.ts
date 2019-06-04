import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { SettingsService } from "../../services/settings-service";
import { StorageProvider } from "src/providers/storage-provider";
import { ContentService } from "src/services/content-service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  constructor(
    private settingsService: SettingsService,
    private location: Location,
    private storageProvider: StorageProvider,
    private contentService: ContentService
  ) {}

  ngOnInit() {}

  get fontSize() {
    return this.settingsService.getFontSize();
  }

  increaseFontSize() {
    this.settingsService.setFontSize(this.fontSize + 4);
  }

  decreaseFontSize() {
    this.settingsService.setFontSize(this.fontSize - 4);
  }

  back() {
    this.location.back();
  }

  async preloadContent() {
    await this.contentService.getJuzs();
    const surahs = await this.contentService.getSurahs();
    for (let surah of surahs) {
      await this.contentService.getVerses(surah.id);
    }
  }

  resetApp() {
    this.storageProvider.resetAll();
  }
}
