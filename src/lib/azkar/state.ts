import { useCallback, useEffect, useRef, useState } from "react";
import { Category, Zikr } from "./types";
import { fetchCategories, fetchAzkarByCategory } from "./api";

export interface DisplayState {
  arabic: boolean;
  transliteration: boolean;
  translation: boolean;
}

export function useAzkarData(initialCategoryId?: number) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<number | undefined>(initialCategoryId);
  const [azkar, setAzkar] = useState<Zikr[]>([]);
  const [loadingAzkar, setLoadingAzkar] = useState(false);
  const [display, setDisplay] = useState<DisplayState>(() => {
    if (typeof window === "undefined")
      return { arabic: true, transliteration: false, translation: true };
    try {
      const raw = localStorage.getItem("azkar-display");
      if (raw) return JSON.parse(raw);
    } catch {}
    return { arabic: true, transliteration: false, translation: true };
  });

  useEffect(() => {
    let mounted = true;
    setLoadingCategories(true);
    fetchCategories()
      .then((c) => {
        if (mounted) setCategories(c);
      })
      .catch((e) => {
        if (mounted) setError(e.message);
      })
      .finally(() => {
        if (mounted) setLoadingCategories(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!activeCategoryId) return;
    let mounted = true;
    setLoadingAzkar(true);
    fetchAzkarByCategory(activeCategoryId)
      .then((z) => {
        if (mounted) setAzkar(z);
      })
      .catch((e) => {
        if (mounted) setError(e.message);
      })
      .finally(() => {
        if (mounted) setLoadingAzkar(false);
      });
    return () => {
      mounted = false;
    };
  }, [activeCategoryId]);

  const retryCategories = () => {
    setError(null);
    setLoadingCategories(true);
    fetchCategories()
      .then((c) => setCategories(c))
      .catch((e) => setError(e.message))
      .finally(() => setLoadingCategories(false));
  };

  useEffect(() => {
    if (display) localStorage.setItem("azkar-display", JSON.stringify(display));
  }, [display]);

  return {
    categories,
    loadingCategories,
    error,
    activeCategoryId,
    setActiveCategoryId,
    azkar,
    loadingAzkar,
    display,
    setDisplay,
    retryCategories,
  };
}

export function useAudioController() {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const play = useCallback(
    (url: string, id: string) => {
      try {
        setError(null);
        if (currentId === id && audioRef.current) {
          audioRef.current.pause();
          setCurrentId(null);
          return;
        }
        if (audioRef.current) {
          audioRef.current.pause();
        }
        const audio = new Audio(url);
        audioRef.current = audio;
        setLoading(true);
        audio.oncanplay = () => {
          setLoading(false);
          audio.play();
        };
        audio.onended = () => setCurrentId(null);
        audio.onerror = () => {
          setError("Audio error");
          setLoading(false);
        };
        setCurrentId(id);
      } catch {
        setError("Playback failed");
        setLoading(false);
      }
    },
    [currentId],
  );

  const isPlaying = useCallback((id: string) => currentId === id, [currentId]);

  return { play, isPlaying, loading, error, currentId };
}
