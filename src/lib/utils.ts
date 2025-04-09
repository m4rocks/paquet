import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// This function is here as a patch for dom-parser weird behaviour that adds html escaped entities into attributes when parsing
export const decodeEscapedUrl = function(str: string) {
  return str
    .replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    })
    .replace(/&amp;/gi, '&')
};