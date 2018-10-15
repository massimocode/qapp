import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { SettingsService } from "../../services/settings-service";
import { StorageProvider } from "src/providers/storage-provider";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  constructor(
    private settingsService: SettingsService,
    private location: Location,
    private storageProvider: StorageProvider
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

  resetApp() {
    this.storageProvider.resetAll();
  }
}
