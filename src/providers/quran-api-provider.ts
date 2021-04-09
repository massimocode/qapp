import { Surah, Verse, Juz } from "../services/content-service";

export abstract class QuranApiProvider {
  abstract getSurahs(): Promise<Surah[]>;
  abstract getVerses(surahId: number): Promise<Verse[]>;
  abstract getJuzs(): Promise<Juz[]>;
}

export class StubQuranApiProvider implements QuranApiProvider {
  async getSurahs(): Promise<Surah[]> {
    return [
      {
        id: 1,
        name: "Fatiha",
        displayBismillah: false,
        verseCount: 2,
      },
      {
        id: 2,
        name: "Baqarah",
        displayBismillah: true,
        verseCount: 2,
      },
    ];
  }
  async getVerses(surahId: number): Promise<Verse[]> {
    if (surahId === 1) {
      return [
        {
          id: 1,
          text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
          pageNumber: 1,
        },
        { id: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", pageNumber: 1 },
      ];
    }
    if (surahId === 2) {
      return [
        { id: 1, text: "الم", pageNumber: 2 },
        {
          id: 2,
          text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
          pageNumber: 2,
        },
      ];
    }
    throw new Error(`Surah with ID ${surahId} not found`);
  }
  async getJuzs(): Promise<Juz[]> {
    return [
      {
        id: 1,
        surah: 1,
        verse: 1,
      },
      {
        id: 2,
        surah: 2,
        verse: 142,
      },
      {
        id: 3,
        surah: 2,
        verse: 253,
      },
    ];
  }
}
