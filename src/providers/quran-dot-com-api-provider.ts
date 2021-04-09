import { Http } from "@angular/http";
import { QuranApiProvider } from "./quran-api-provider";
import {
  Surah as ServiceSurah,
  Verse as ServiceVerse,
  Juz as ServiceJuz,
} from "../services/content-service";
import { Injectable } from "@angular/core";

@Injectable()
export class QuranDotComApiProvider implements QuranApiProvider {
  private readonly baseUrl = "https://api.quran.com/api/v3";

  constructor(private http: Http) {}

  async getSurahs(): Promise<ServiceSurah[]> {
    const response: ChaptersResponse = (
      await this.http.get(`${this.baseUrl}/chapters`).toPromise()
    ).json();
    return response.chapters.map<ServiceSurah>((x) => ({
      id: x.id,
      name: x.name_arabic,
      displayBismillah: x.bismillah_pre,
      verseCount: x.verses_count,
    }));
  }

  async getVerses(surahId: number): Promise<ServiceVerse[]> {
    const surahs = await this.getSurahs();
    const surah = surahs.find((x) => x.id === surahId)!;

    const pages = [];
    let pagesToFetch = Math.ceil(surah.verseCount / 50);

    for (let page = 1; page <= pagesToFetch; page++) {
      pages.push(this.getPageOfVerses(surahId, page));
    }

    return (await Promise.all(pages))
      .reduce<Verse[]>((verses, page) => verses.concat(page.verses), [])
      .map<ServiceVerse>((x) => ({
        id: x.verse_number,
        text: x.text_madani,
        pageNumber: x.page_number,
      }));
  }

  private async getPageOfVerses(surahId: number, page = 1) {
    return (
      await this.http
        .get(
          `${this.baseUrl}/chapters/${surahId}/verses?limit=50&text_type=image&page=${page}`
        )
        .toPromise()
    ).json() as VersesResponse;
  }

  async getJuzs(): Promise<ServiceJuz[]> {
    const response = (
      await this.http.get(`${this.baseUrl}/juzs`).toPromise()
    ).json() as JuzsResponse;

    return response.juzs.map<ServiceJuz>((x) => {
      const surahNumbers = Object.keys(x.verse_mapping).map((key) =>
        parseInt(key, 10)
      );
      const startSurah = Math.min(...surahNumbers);
      return {
        id: x.juz_number,
        surah: startSurah,
        verse: parseInt(x.verse_mapping[startSurah].split("-")[0]),
      };
    });
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

type JuzsResponse = {
  juzs: Juz[];
};

type Juz = {
  id: number;
  juz_number: number;
  verse_mapping: {
    [chapter: number]: string;
  };
};
