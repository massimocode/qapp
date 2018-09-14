import { Surah, SurahID, Verse } from "../services/content-service";

export abstract class QuranApiProvider {
  abstract getSurahs(): Promise<Surah[]>;
  abstract getVerses(surahId: SurahID): Promise<Verse[]>;
}

export class MockQuranApiProvider implements QuranApiProvider {
  async getSurahs(): Promise<Surah[]> {
    return [
      {
        id: 1 as SurahID,
        name: "Fatiha",
        displayBismillah: false
      },
      {
        id: 2 as SurahID,
        name: "Baqarah",
        displayBismillah: true
      }
    ];
  }
  async getVerses(surahId: SurahID): Promise<Verse[]> {
    if (surahId === 1) {
      return [{ text: "Bism" }, { text: "Alham" }];
    }
    if (surahId === 2) {
      return [{ text: "Alif lam mim" }, { text: "Zaleka" }];
    }
    throw new Error(`Surah with ID ${surahId} not found`);
  }
}
