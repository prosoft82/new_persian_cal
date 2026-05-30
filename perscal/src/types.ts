/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface JalaliDate {
  jy: number; // Jalali Year (e.g. 1405)
  jm: number; // Jalali Month (1 to 12)
  jd: number; // Jalali Day (1 to 31)
}

export interface GregorianDate {
  gy: number; // Gregorian Year
  gm: number; // Gregorian Month (1 to 12)
  gd: number; // Gregorian Day
}

export interface SecureEvent {
  id: string;
  dateKey: string; // Format: "JY-JM-JD", e.g. "1405-3-15"
  titleCipher: string; // Encrypted title hex/base64
  descriptionCipher: string; // Encrypted body hex/base64
  time: string; // Encrypted or plain time
  salt: string; // Hex representation of the unique salt
  iv: string; // Hex representation of initialization vector
  createdAt: number;
}

export interface DecryptedEvent {
  id: string;
  dateKey: string;
  title: string;
  description: string;
  time: string;
  createdAt: number;
}

export interface Goal {
  id: string; // Unique identifier for up to 3 goals
  title: string;
  targetMonth: number;
  targetDay: number;
  createdAt: number;
  crossedDays: string[]; // array of "JY-JM-JD"
}

export interface QuranVerse {
  ayah: string;       // Arabic text of the verse
  translation: string; // Persian translation
  citation: string;    // Surah and Ayah number
  topic: string;       // Central theme (e.g., patience, striving)
}

export interface EnglishWord {
  word: string;             // English word
  level: string;            // CEFR level (B1, B2, C1, C2)
  partOfSpeech: string;     // e.g., adjective, noun, verb
  pronunciation: string;    // IPA or phonetic guide
  translation: string;      // Persian translation
  definition: string;       // Simple English definition
  example: string;          // English example sentence
  exampleTranslation: string; // Persian translation of example
}

export interface StaticHoliday {
  month: number;
  day: number;
  title: string;
  isHoliday: boolean;
}

export interface CalendarDay {
  dayNumber: number; // Jalali day (1-31)
  jalaliDate: JalaliDate;
  gregorianDate: GregorianDate;
  isCurrentMonth: boolean;
  isToday: boolean;
  holidays: string[];
  isHoliday: boolean; // True if any holiday is off
  weekday: number; // 0 (Shanbeh) to 6 (Jomeh)
  eventsCount: number;
}

export interface CryptoState {
  isLocked: boolean;
  passphraseStrength: 'weak' | 'fair' | 'strong' | '';
  activeKey: CryptoKey | null;
  activeSalt: Uint8Array | null;
  passphraseHint: string;
  encryptionStats: {
    algorithm: string;
    pbkdf2Iterations: number;
    keySize: string;
    lastOpTimeMs: number;
  } | null;
}
