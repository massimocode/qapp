import { Http } from "@angular/http";
import { QuranApiProvider } from "./quran-api-provider";
import {
  Surah as ServiceSurah,
  Verse as ServiceVerse
} from "../services/content-service";
import { Injectable } from "@angular/core";

@Injectable()
export class QuranDotComApiProvider implements QuranApiProvider {
  private readonly baseUrl = "https://quran.com/api/api/v3";

  constructor(private http: Http) {}

  async getSurahs(): Promise<ServiceSurah[]> {
    const response: ChaptersResponse = (await this.http
      .get(`${this.baseUrl}/chapters`)
      .toPromise()).json();
    return response.chapters.map<ServiceSurah>(x => ({
      id: x.id,
      name: x.name_arabic,
      displayBismillah: x.bismillah_pre
    }));
  }

  async getVerses(surahId: number): Promise<ServiceVerse[]> {
    const firstPage = await this.getPageOfVerses(surahId);
    const pages = [Promise.resolve(firstPage)];

    console.log(firstPage.meta.total_pages);
    for (
      let pageNumber = 2;
      pageNumber <= firstPage.meta.total_pages;
      pageNumber++
    ) {
      pages.push(this.getPageOfVerses(surahId, pageNumber));
    }

    return (await Promise.all(pages))
      .reduce<Verse[]>((verses, page) => verses.concat(page.verses), [])
      .map<ServiceVerse>(x => ({
        id: x.verse_number,
        text: x.text_madani
      }));
  }

  private async getPageOfVerses(surahId: number, page = 1) {
    return (await this.http
      .get(
        `${
          this.baseUrl
        }/chapters/${surahId}/verses?limit=50&text_type=image&page=${page}`
      )
      .toPromise()).json() as VersesResponse;
  }
}

type ChaptersResponse = {
  chapters: Chapter[];
};

type Chapter = {
  id: number;
  chapter_number: number;
  bismillah_pre: boolean;
  revelation_order: number;
  revelation_place: string;
  name_complex: string;
  name_arabic: string;
  name_simple: string;
  verses_count: number;
  pages: number[];
  translated_name: TranslatedName;
};

type TranslatedName = {
  language_name: string;
  name: string;
};

type VersesResponse = {
  verses: Verse[];
  meta: Meta;
};

type MediaContent = {
  url: string;
  embed_text: string;
  provider: string;
  author_name: string;
};

type Audio = {
  url: string;
};

type Translation = {
  id: number;
  language_name: string;
  text: string;
  resource_name?: any;
  resource_id: number;
};

type Transliteration = {
  id: number;
  language_name: string;
  text: string;
  resource_name?: any;
  resource_id: number;
};

type Word = {
  id: number;
  position: number;
  text_madani: string;
  text_indopak?: any;
  text_simple: string;
  verse_key: string;
  class_name: string;
  line_number: number;
  page_number: number;
  code: string;
  code_v3: string;
  char_type: string;
  audio: Audio;
  translation: Translation;
  transliteration: Transliteration;
};

type Verse = {
  id: number;
  verse_number: number;
  chapter_id: number;
  verse_key: string;
  text_madani: string;
  text_indopak: string;
  text_simple: string;
  juz_number: number;
  hizb_number: number;
  rub_number: number;
  sajdah?: any;
  sajdah_number?: any;
  page_number: number;
  media_contents: MediaContent[];
  words: Word[];
};

type Meta = {
  current_page: number;
  next_page?: any;
  prev_page?: any;
  total_pages: number;
  total_count: number;
};
