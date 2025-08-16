'use client';

import { useCallback } from 'react';
import Link from 'next/link';

// ---- Типизация Метрики (без any) ----
type YMMethod = 'init' | 'hit' | 'reachGoal';
declare global {
  interface Window {
    ym?: (counterId: number, method: YMMethod, ...args: unknown[]) => void;
  }
}

// номер счётчика Метрики
const METRIKA_ID = 103721710;

// безопасный вызов цели
function reachGoal(goal: string) {
  if (typeof window !== 'undefined') {
    window.ym?.(METRIKA_ID, 'reachGoal', goal);
  }
}

export default function HousesPage() {
  const onTelegramClick = useCallback(() => {
    reachGoal('tg_click_houses');
  }, []);

  const onWhatsAppClick = useCallback(() => {
    reachGoal('wa_click_houses');
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <header className="mx-auto max-w-5xl px-6 py-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← На главную
        </Link>
      </header>

      <section className="mx-auto max-w-5xl px-6">
        <h1 className="text-4xl font-bold tracking-tight">Neoigloo — дома серии «Houses»</h1>
        <p className="mt-3 text-lg text-gray-600">
          Современные купольные дома: тёплые, быстрые в сборке и эффектные внешне.
          Выберите конфигурацию и свяжитесь с нами в удобном мессенджере.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://t.me/whatuknow"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onTelegramClick}
            className="inline-flex items-center justify-center rounded-lg bg-[#27A7E7] px-5 py-3 text-white shadow hover:opacity-95"
          >
            ✈️ Написать в Telegram
          </a>

          <a
            href="https://wa.me/79096787222?text=%D0%A5%D0%BE%D1%87%D1%83%20%D0%B4%D0%BE%D0%BC%20Neoigloo%20Houses"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onWhatsAppClick}
            className="inline-flex items-center justify-center rounded-lg bg-[#25D366] px-5 py-3 text-white shadow hover:opacity-95"
          >
            💬 Написать в WhatsApp
          </a>

          <a
            href="https://Neoigloo.one"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border px-5 py-3 text-gray-700 hover:bg-gray-100"
          >
            🌐 Neoigloo.one
          </a>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { s: 20, price: '350 000 ₽' },
            { s: 30, price: '490 000 ₽' },
            { s: 40, price: '620 000 ₽' },
          ].map((v) => (
            <div
              key={v.s}
              className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow"
            >
              <div className="text-sm uppercase tracking-wide text-gray-500">Модель</div>
              <div className="mt-1 text-2xl font-semibold">{v.s} м²</div>
              <div className="mt-3 text-lg text-gray-700">От {v.price}</div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Нажимая на кнопки, вы будете перенаправлены в выбранный мессенджер.
        </p>
      </section>

      <footer className="mx-auto max-w-5xl px-6 py-10 text-sm text-gray-500">
        © {new Date().getFullYear()} Neoigloo
      </footer>
    </main>
  );
}
