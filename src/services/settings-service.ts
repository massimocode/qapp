import { StorageProvider } from "../providers/storage-provider";
import { Injectable } from "@angular/core";
import { StyleProvider } from "../providers/style-provider";

export abstract class SettingsService {
  abstract getFontSize(): number;
  abstract setFontSize(size: number): void;
}

const DEFAULT_FONT_SIZE = 16;
const FONT_SIZE_KEY = "font_size";

@Injectable()
export class SettingsServiceImplementation implements SettingsService {
  private fontSize: number;

  constructor(
    private storageProvider: StorageProvider,
    private styleProvider: StyleProvider
  ) {
    this.fontSize =
      this.storageProvider.get<number>(FONT_SIZE_KEY) || DEFAULT_FONT_SIZE;
    this.styleProvider.setFontSize(this.fontSize);
  }

  getFontSize(): number {
    return this.fontSize;
  }

  setFontSize(size: number): void {
    this.storageProvider.set(FONT_SIZE_KEY, size);
    this.fontSize = size;
    this.styleProvider.setFontSize(size);
  }
}
