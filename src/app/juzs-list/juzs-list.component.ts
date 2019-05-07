import { Component, OnInit } from "@angular/core";
import { ContentService, Juz } from "../../services/content-service";

@Component({
  selector: "app-juzs-list",
  templateUrl: "./juzs-list.component.html",
  styleUrls: ["./juzs-list.component.css"]
})
export class JuzsListComponent implements OnInit {
  juzs: Juz[] | null = null;

  constructor(private contentService: ContentService) {}

  async ngOnInit() {
    this.juzs = await this.contentService.getJuzs();
  }
}
