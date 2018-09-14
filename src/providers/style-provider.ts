// Later on we can implement a NativescriptStyleProvider
export abstract class StyleProvider {
  abstract setFontSize(size: number): void;
}

export class BrowserStyleProvider implements StyleProvider {
  private readonly sheet: CSSStyleSheet;

  constructor() {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    this.sheet = style.sheet as CSSStyleSheet;
  }

  setFontSize(size: number): void {
    this.insertRule(".arabic", `font-size: ${size}px;`, 0);
  }

  private insertRule(selector: string, rules: string, index: number) {
    if (this.sheet.cssRules.item(index) !== null) {
      this.sheet.deleteRule(index);
    }
    if ("insertRule" in this.sheet) {
      this.sheet.insertRule(`${selector} { ${rules} }`, index);
    } else if ("addRule" in this.sheet) {
      // TypeScript thinks insertRule will always be there
      (this.sheet as CSSStyleSheet).addRule(selector, rules, index);
    } else {
      throw new Error("Unable to manipulate styles");
    }
  }
}
