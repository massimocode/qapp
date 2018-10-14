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
    this.settingsService.setFontSize(this.fontSize + 2);
  }

  decreaseFontSize() {
    this.settingsService.setFontSize(this.fontSize - 2);
  }

  back() {
    this.location.back();
  }

  resetApp() {
    const message =
      "Are you sure you want to reset the app? This will wipe any settings and downloaded content!";
    if (window.confirm(message)) {
      this.storageProvider.resetAll();
    }
  }
}
