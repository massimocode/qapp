import { Injectable } from "@angular/core";
import { QuranApiProvider } from "../providers/quran-api-provider";
import { StorageProvider } from "../providers/storage-provider";

export abstract class ContentService {
  abstract getSurahs(): Promise<Surah[]>;
  abstract getVerses(surahId: number): Promise<Verse[]>;
  abstract getJuzs(): Promise<Juz[]>;
}

@Injectable()
export class ContentServiceImplementation implements ContentService {
  constructor(
    private quranApiProvider: QuranApiProvider,
    private storageProvider: StorageProvider
  ) {}

  async getSurahs(): Promise<Surah[]> {
    const key = "surahs";
    let surahs = this.storageProvider.get<Surah[]>(key);
    if (surahs === null) {
      surahs = await this.quranApiProvider.getSurahs();
      this.storageProvider.set(key, surahs);
    }
    return surahs;
  }

  async getVerses(surahId: number): Promise<Verse[]> {
    const key = `verses_${surahId}`;
    let verses = this.storageProvider.get<Verse[]>(key);
    if (verses === null) {
      verses = await this.quranApiProvider.getVerses(surahId);
      this.storageProvider.set(key, verses);
    }
    return verses;
  }

  async getJuzs(): Promise<Juz[]> {
    const key = "juzs";
    let juzs = this.storageProvider.get<Juz[]>(key);
    if (juzs === null) {
      juzs = await this.quranApiProvider.getJuzs();
      this.storageProvider.set(key, juzs);
    }
    return juzs;
  }
}

export type Surah = {
  id: number;
  name: string;
  displayBismillah: boolean;
  verseCount: number;
};

export type Verse = {
  id: number;
  text: string;
  pageNumber: number;
};

export type Juz = {
  id: number;
  surah: number;
  verse: number;
};
