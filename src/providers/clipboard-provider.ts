export abstract class ClipboardProvider {
  abstract copy(text: string): Promise<void>;
}

export class BrowserClipboardProvider implements ClipboardProvider {
  async copy(text: string): Promise<void> {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "0";
    textArea.style.top = "0";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      textArea.contentEditable = "true";
      textArea.readOnly = true;
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }

    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}
