import { trim } from "reinforcements";

export const ARABIC_PATTERN = /[\u0600-\u06FF]/;

export function stringStartsWithArabic(text: string): boolean {
    return trim(text).charAt(0).match(ARABIC_PATTERN) !== null;
}