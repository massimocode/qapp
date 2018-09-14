import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../../services/settings-service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

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
}
