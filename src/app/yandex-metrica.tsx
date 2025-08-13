'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const COUNTER_ID = 103721710; // ваш ID счётчика

declare global {
  interface Window {
    ym?: (
      id: number,
      method: 'init' | 'hit' | 'reachGoal' | string,
      ...rest: unknown[]
    ) => void;
  }
}

export default function YandexMetrica() {
  const pathname = usePathname();

  useEffect(() => {
    // инициализация
    window.ym?.(COUNTER_ID, 'init', {
      webvisor: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      defer: true,
    });
  }, []);

  useEffect(() => {
    // «попадание» при смене пути
    if (typeof pathname === 'string') {
      window.ym?.(COUNTER_ID, 'hit', pathname);
    }
  }, [pathname]);

  return null;
}

// Хелперы для целей (без any)
export function reachGoal(name: string, params?: Record<string, unknown>) {
  window.ym?.(COUNTER_ID, 'reachGoal', name, params ?? {});
}
