export interface Category {
  ID: number;
  TITLE: string;
  AUDIO_URL: string;
  TEXT: string;
}

export interface Zikr {
  ID: number;
  ARABIC_TEXT: string;
  LANGUAGE_ARABIC_TRANSLATED_TEXT: string;
  TRANSLATED_TEXT: string;
  REPEAT: number;
  AUDIO: string;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry?: number;
}

export interface CacheOptions {
  expiry?: number;
  name: string;
}
