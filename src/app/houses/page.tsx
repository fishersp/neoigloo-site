'use client';

import { useMemo, useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import Image from 'next/image';

type HouseSize = 20 | 30 | 40;

const PRICE_BY_SIZE: Record<HouseSize, number> = {
  20: 350_000,
  30: 490_000,
  40: 620_000,
};

// Яндекс.Метрика: безопасная типизация и вызов reachGoal (если счётчик подключён)
type YMMetricaFn = (
  id: number,
  method: 'init' | 'hit' | 'reachGoal',
  ...rest: unknown[]
) => void;

declare global {
  interface Window {
    ym?: YMMetricaFn;
  }
}

export default function HomePage() {
  const [size, setSize] = useState<HouseSize>(20);
  const [phone, setPhone] = useState<string>('+7 (');

  // Цена считается из размера — нет лишнего состояния и warning-ов
  const price = useMemo<number>(() => PRICE_BY_SIZE[size], [size]);

  // Маска телефона
  const formatPhone = (value: string): string => {
    let digits = value.replace(/\D/g, '');
    if (digits.startsWith('7')) digits = digits.slice(1); // не дублируем +7

    let result = '+7';
    if (digits.length > 0) result += ' (' + digits.substring(0, 3);
    if (digits.length >= 4) result += ') ' + digits.substring(3, 6);
    if (digits.length >= 7) result += '-' + digits.substring(6, 8);
    if (digits.length >= 9) result += '-' + digits.substring(8, 10);

    return result;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const isPhoneValid = phone.replace(/\D/g, '').length === 11;

  // Метрика (если есть на странице). ID подставь свой, если используешь.
  const reachGoal = (goal: string) => {
    try {
      // замените 12345678 на ваш ID счётчика или оставьте как есть — вызов безопасный
      window.ym?.(12345678, 'reachGoal', goal);
    } catch {
      // ничего — делаем вызов «мягким»
    }
  };

  // Прямой переход в Telegram
  const openTelegram = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reachGoal('tg_click');
    // Прямая ссылка в чат/профиль
    window.open('https://t.me/whatuknow', '_blank', 'noopener,noreferrer');
  };

  // Прямой переход в WhatsApp с текстом
  const openWhatsApp = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reachGoal('wa_click');
    const msg = encodeURIComponent(
      `Здравствуйте! Хочу заказать дом Neoigloo ${size} м² за ${price.toLocaleString('ru-RU')} ₽`
    );
    // Номер: +7 909 678 7222 → 79096787222
    window.open(`https://wa.me/79096787222?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Шапка */}
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold">Купите дом в форме купола</h1>
        <p className="mt-2 text-lg text-gray-500">
          Комфортные и стильные дома для отдыха на природе. Подробнее на{' '}
          <a
            href="https://Neoigloo.one"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Neoigloo.one
          </a>
        </p>
      </header>

      {/* Калькулятор */}
      <section className="p-6 max-w-xl mx-auto bg-gray-50 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Калькулятор цены</h2>

        <select
          className="border p-2 rounded w-full"
          value={size}
          onChange={(e) => setSize(Number(e.target.value) as HouseSize)}
        >
          <option value={20}>Дом 20 м²</option>
          <option value={30}>Дом 30 м²</option>
          <option value={40}>Дом 40 м²</option>
        </select>

        <p className="text-xl mt-4">Цена: {price.toLocaleString('ru-RU')} ₽</p>

        <div className="mt-4 rounded-lg overflow-hidden shadow-md">
          <Image
            src={`/house${size}.jpg`}
            alt={`Дом ${size} м²`}
            width={1200}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Форма и кнопки */}
      <section className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Оставить заявку</h2>
        <div className="max-w-md mx-auto flex flex-col gap-3">
          <input
            type="text"
            placeholder="Ваше имя"
            className="border p-2 rounded"
          />

          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            className="border p-2 rounded"
            placeholder="+7 (___) ___-__-__"
          />

          <button
            onClick={openTelegram}
            disabled={!isPhoneValid}
            className={`px-4 py-2 rounded text-white ${
              isPhoneValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            📩 Написать в Telegram
          </button>

          <button
            onClick={openWhatsApp}
            disabled={!isPhoneValid}
            className={`px-4 py-2 rounded text-white ${
              isPhoneValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            💬 Написать в WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}
