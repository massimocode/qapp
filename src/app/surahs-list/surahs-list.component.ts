import { Component, OnInit } from "@angular/core";
import { ContentService, Surah } from "../../services/content-service";

@Component({
  selector: "app-surahs-list",
  templateUrl: "./surahs-list.component.html",
  styleUrls: ["./surahs-list.component.css"]
})
export class SurahsListComponent implements OnInit {
  surahs: Surah[] | null = null;

  constructor(private contentService: ContentService) {}

  async ngOnInit() {
    this.surahs = await this.contentService.getSurahs();
  }
}
