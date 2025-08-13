'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import YandexMetrica from './YandexMetrica'; // компонент со скриптом Метрики

// ID счётчика Метрики (из интерфейса: 103721710)
const METRIKA_ID = 103721710;

type SizeOption = 20 | 30 | 40;

const PRICES: Record<SizeOption, number> = {
  20: 350_000,
  30: 490_000,
  40: 620_000,
};

export default function HomePage() {
  const [size, setSize] = useState<SizeOption>(20);
  const [price, setPrice] = useState<number>(PRICES[20]);
  const [phone, setPhone] = useState<string>('+7 (');

  const calculatePrice = (value: SizeOption) => {
    setSize(value);
    setPrice(PRICES[value]);
    reachGoal('calc_change');
  };

  // форматирование телефона под +7 (XXX) XXX-XX-XX
  const formatPhone = (value: string) => {
    let digits = value.replace(/\D/g, '');
    if (digits.startsWith('7')) digits = digits.slice(1);

    let result = '+7';
    if (digits.length > 0) result += ' (' + digits.substring(0, 3);
    if (digits.length >= 4) result += ') ' + digits.substring(3, 6);
    if (digits.length >= 7) result += '-' + digits.substring(6, 8);
    if (digits.length >= 9) result += '-' + digits.substring(8, 10);
    return result;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const isPhoneValid = phone.replace(/\D/g, '').length === 11;

  // безопасный вызов Метрики без объявления глобальных типов здесь
  const reachGoal = (goal: string) => {
    try {
      (window as any).ym?.(METRIKA_ID, 'reachGoal', goal);
    } catch {
      /* noop */
    }
  };

  const handleTelegram = () => {
    reachGoal('tg_click');
    // ваш официальный канал/контакт в ТГ
    window.open('https://t.me/neoigloo', '_blank', 'noopener,noreferrer');
  };

  const handleWhatsApp = () => {
    reachGoal('wa_click');
    const message = encodeURIComponent(
      `Здравствуйте! Хочу заказать дом Neoigloo ${size} м² за ${price.toLocaleString()} ₽`
    );
    // WhatsApp на номер +7 909 678 7222
    window.open(`https://wa.me/79096787222?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Скрипт Метрики + SPA-хиты */}
      <YandexMetrica counterId={METRIKA_ID} />

      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold">Купите дом в форме купола</h1>
        <p className="text-lg text-gray-500 mt-2">
          Комфортные и стильные дома для отдыха на природе. Подробнее на{' '}
          <Link
            href="https://neoigloo.one"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
            onClick={() => reachGoal('site_link_click')}
          >
            Neoigloo.one
          </Link>
        </p>
      </header>

      <main className="p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Калькулятор */}
        <section className="bg-gray-50 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Калькулятор цены</h2>

          <label className="block text-sm text-gray-600 mb-2">Площадь</label>
          <select
            className="border p-2 rounded w-full"
            value={size}
            onChange={(e) => calculatePrice(Number(e.target.value) as SizeOption)}
          >
            <option value={20}>Дом 20 м²</option>
            <option value={30}>Дом 30 м²</option>
            <option value={40}>Дом 40 м²</option>
          </select>

          <p className="text-xl mt-4">
            Цена: <span className="font-semibold">{price.toLocaleString()} ₽</span>
          </p>

          <div className="mt-6">
            <Image
              src={`/house${size}.jpg`}
              alt={`Дом ${size} м²`}
              width={800}
              height={450}
              className="rounded-lg shadow-md w-full h-auto"
              priority
            />
          </div>
        </section>

        {/* Форма и кнопки */}
        <section className="rounded-xl shadow-md p-6 border">
          <h2 className="text-2xl font-bold mb-4 text-center">Оставить заявку</h2>

          <div className="flex flex-col gap-3 max-w-md mx-auto">
            <input type="text" placeholder="Ваше имя" className="border p-2 rounded" />
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className="border p-2 rounded"
              placeholder="+7 (___) ___-__-__"
            />

            <button
              onClick={handleTelegram}
              disabled={!isPhoneValid}
              className={`px-4 py-2 rounded text-white transition ${isPhoneValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
              ✈️ Написать в Telegram
            </button>

            <button
              onClick={handleWhatsApp}
              disabled={!isPhoneValid}
              className={`px-4 py-2 rounded text-white transition ${isPhoneValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
              💬 Написать в WhatsApp
            </button>

            <p className="text-xs text-gray-500 mt-1 text-center">
              Нажимая на кнопку, вы соглашаетесь с обработкой персональных данных.
            </p>
          </div>
        </section>
      </main>

      <footer className="p-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Neoigloo •{' '}
        <Link
          href="https://neoigloo.one"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          onClick={() => reachGoal('site_link_click_footer')}
        >
          Neoigloo.one
        </Link>
      </footer>
    </div>
  );
}
