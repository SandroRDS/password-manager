import { Themes } from "../types";

export function saveTheme(theme: Themes) {
  localStorage.setItem('theme', theme);
}

export function getThemeSaved(): Themes {
  const themeSaved = localStorage.getItem('theme');
  if (!themeSaved) localStorage.setItem('theme', 'dark');
  return themeSaved as Themes ?? 'dark';
}