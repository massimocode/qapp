import { Injectable } from "@angular/core";
import { QuranApiProvider } from "../providers/quran-api-provider";
import { StorageProvider } from "../providers/storage-provider";

export abstract class ContentService {
  abstract getSurahs(): Promise<Surah[]>;
  abstract getVerses(surahId: SurahID): Promise<Verse[]>;
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

  async getVerses(surahId: SurahID): Promise<Verse[]> {
    const key = `verses_${surahId}`;
    let verses = this.storageProvider.get<Verse[]>(key);
    if (verses === null) {
      verses = await this.quranApiProvider.getVerses(surahId);
      this.storageProvider.set(key, verses);
    }
    return verses;
  }
}

export type Surah = {
  id: SurahID;
  name: string;
  displayBismillah: boolean;
};

export type Verse = {
  text: string;
};

export type SurahID = number;
