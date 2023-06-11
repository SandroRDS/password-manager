import { Themes } from "../types";
import { saveTheme } from "./themeStorageUtils";

export default function switchTheme(theme?: Themes) {
  if (theme) document.body.className = `${theme}-mode`;
  else {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('white-mode');
    const theme = document.body.className.replace('-mode', '');
    saveTheme(theme as Themes);
  }
}