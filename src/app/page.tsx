'use client';

import { useMemo, useState } from 'react';

export const revalidate = 0; // чтобы страница не кэшировалась CDN

// ==== НАСТРОЙКИ ====
const YM_ID = 12345678; // <— замени на ID счётчика Метрики (если используешь цели)
const TELEGRAM_URL = 'https://t.me/whatuknow';
const WHATSAPP_NUMBER = '79096787222'; // +7 909 678 7222 без плюса и пробелов
const MAIN_SITE_URL = 'https://Neoigloo.one';
// ===================

type Plan = {
  id: '20' | '30' | '40';
  title: string;
  size: number;
  basePrice: number;
  img: string;
};

type Addon = {
  id: 'insulation' | 'terrace' | 'assembly';
  title: string;
  price: number;
};

const PLANS: Plan[] = [
  { id: '20', title: 'Дом 20 м²', size: 20, basePrice: 350_000, img: '/house20.jpg' },
  { id: '30', title: 'Дом 30 м²', size: 30, basePrice: 490_000, img: '/house30.jpg' },
  { id: '40', title: 'Дом 40 м²', size: 40, basePrice: 620_000, img: '/house40.jpg' },
];

const ADDONS: Addon[] = [
  { id: 'insulation', title: 'Зимнее утепление', price: 60_000 },
  { id: 'terrace', title: 'Терраса 10 м²', price: 90_000 },
  { id: 'assembly', title: 'Доставка и монтаж', price: 80_000 },
];

const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n) + ' ₽';

const ymGoal = (goal: string) => {
  if (typeof window !== 'undefined' && (window as any).ym) {
    (window as any).ym(YM_ID, 'reachGoal', goal);
  }
};

export default function HomePage() {
  const [selected, setSelected] = useState<Plan>(PLANS[0]);
  const [addons, setAddons] = useState<Record<Addon['id'], boolean>>({
    insulation: false,
    terrace: false,
    assembly: false,
  });

  const total = useMemo(() => {
    let sum = selected.basePrice;
    for (const a of ADDONS) if (addons[a.id]) sum += a.price;
    return sum;
  }, [selected, addons]);

  const waLink = useMemo(() => {
    const text = `Здравствуйте! Хочу дом Neoigloo ${selected.size} м². Итоговая цена: ${fmt(total)}.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [selected.size, total]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <header className="container mx-auto px-4 pt-14 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Купольные дома Neoigloo
        </h1>
        <p className="mt-3 text-gray-500">
          Тёплые, стильные и быстрые в монтаже. Выберите размер и получите цену.
        </p>
      </header>

      {/* Calculator */}
      <main className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Варианты и допы */}
          <section className="bg-gray-50 rounded-2xl shadow-sm p-5">
            <h2 className="text-xl font-semibold mb-4">1. Выберите вариант</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {PLANS.map((plan) => {
                const active = plan.id === selected.id;
                return (
                  <button
                    key={plan.id}
                    onClick={() => {
                      setSelected(plan);
                      ymGoal('calc_click'); // опционально, если цель создана
                    }}
                    className={`rounded-xl border p-4 text-left transition
                      ${active ? 'border-sky-500 ring-2 ring-sky-200 bg-white' : 'border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    <div className="text-lg font-semibold">{plan.title}</div>
                    <div className="text-sm text-gray-500 mt-1">от {fmt(plan.basePrice)}</div>
                  </button>
                );
              })}
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">2. Дополнительно</h2>
            <div className="space-y-2">
              {ADDONS.map((a) => (
                <label key={a.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-sky-500"
                    checked={addons[a.id]}
                    onChange={(e) => {
                      setAddons((prev) => ({ ...prev, [a.id]: e.target.checked }));
                      ymGoal('calc_click'); // опционально
                    }}
                  />
                  <span className="flex-1">{a.title}</span>
                  <span className="text-gray-500">+ {fmt(a.price)}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-white p-4 border">
              <span className="text-lg">Итого:</span>
              <strong className="text-2xl font-bold">{fmt(total)}</strong>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              * Цена ориентировочная. Окончательная стоимость зависит от фундамента,
              участка и комплектации.
            </div>
          </section>

          {/* Превью и CTA */}
          <section className="bg-gray-50 rounded-2xl shadow-sm p-5">
            <div className="rounded-xl overflow-hidden border bg-white">
              <img
                src={selected.img}
                alt={selected.title}
                className="w-full h-72 object-cover"
              />
            </div>

            <div className="mt-5">
              <h3 className="text-lg font-semibold">{selected.title}</h3>
              <p className="text-gray-500">
                Базовая цена: {fmt(selected.basePrice)} • Текущая: {fmt(total)}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Telegram */}
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => ymGoal('tg_click')}
                className="inline-flex w-full items-center justify-center rounded-xl bg-sky-600 text-white px-5 py-3 text-lg font-semibold shadow hover:bg-sky-700 transition"
              >
                ✈️ Обсудить в Telegram
              </a>

              {/* WhatsApp */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => ymGoal('wa_click')}
                className="inline-flex w-full items-center justify-center rounded-xl bg-green-600 text-white px-5 py-3 text-lg font-semibold shadow hover:bg-green-700 transition"
              >
                💬 Написать в WhatsApp
              </a>
            </div>

            <div className="mt-3 text-xs text-gray-400">
              Нажимая кнопки, вы переходите к диалогу в Telegram / WhatsApp.
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-sm text-gray-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Neoigloo</span>
          <a
            href={MAIN_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-700"
            title="Открыть официальный сайт Neoigloo.one"
          >
            Официальный сайт: Neoigloo.one
          </a>
        </div>
      </footer>
    </div>
  );
}
