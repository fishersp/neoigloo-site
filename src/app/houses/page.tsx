'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

type Size = 20 | 30 | 40;

const PRICE: Record<Size, number> = {
  20: 350_000,
  30: 490_000,
  40: 620_000,
};

const TG_URL = 'https://t.me/neoigloo';            // телеграм
const WA_URL = 'https://wa.me/79096787222';        // whatsapp на +7 909 678 7222

function formatPhone(value: string): string {
  // оставляем только цифры
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('7')) digits = digits.slice(1);
  digits = digits.slice(0, 10); // не больше 10 цифр после кода страны

  let res = '+7';
  if (digits.length > 0) res += ' (' + digits.substring(0, 3);
  if (digits.length >= 4) res += ') ' + digits.substring(3, 6);
  if (digits.length >= 7) res += '-' + digits.substring(6, 8);
  if (digits.length >= 9) res += '-' + digits.substring(8, 10);
  return res;
}

function toSize(v: string): Size {
  const n = Number(v) as Size;
  return (n === 20 || n === 30 || n === 40) ? n : 20;
}

export default function HomePage(): JSX.Element {
  const [size, setSize] = useState<Size>(20);
  const [phone, setPhone] = useState<string>('+7 (');

  const price = useMemo(() => PRICE[size], [size]);
  const isPhoneValid = phone.replace(/\D/g, '').length === 11;

  const open = (url: string): void => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold">Neoigloo — купольные дома</h1>
        <p className="mt-2 text-lg text-gray-600">
          Комфортные и стильные купола для отдыха и жизни. Подробнее на{' '}
          <a
            href="https://Neoigloo.one"
            className="underline text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neoigloo.one
          </a>
        </p>
      </header>

      {/* иллюстрация (опционально) */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-xl shadow">
          <Image
            src="/house20.jpg"
            alt="Купольный дом Neoigloo"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Калькулятор */}
      <section className="p-6 max-w-xl mx-auto mt-6 bg-gray-50 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Калькулятор цены</h2>

        <label className="block mb-2 text-sm text-gray-700">Площадь</label>
        <select
          className="border p-2 rounded w-full"
          value={size}
          onChange={(e) => setSize(toSize(e.target.value))}
        >
          <option value={20}>Дом 20 м²</option>
          <option value={30}>Дом 30 м²</option>
          <option value={40}>Дом 40 м²</option>
        </select>

        <p className="text-xl mt-4">
          Цена: <span className="font-semibold">{price.toLocaleString('ru-RU')} ₽</span>
        </p>

        {/* Телефон (для заявки — просто поле, без отправки на сервер) */}
        <label className="block mt-6 mb-2 text-sm text-gray-700">Телефон</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          placeholder="+7 (___) ___-__-__"
          className="border p-2 rounded w-full"
        />

        {/* Кнопки мессенджеров */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => open(TG_URL)}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            📩 Написать в Telegram
          </button>

          <button
            onClick={() => open(WA_URL)}
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
          >
            💬 Написать в WhatsApp
          </button>
        </div>

        {/* Подсказка, если телефон неполный */}
        {!isPhoneValid && (
          <p className="mt-3 text-sm text-gray-500">
            Введите номер полностью, чтобы менеджер мог связаться с вами.
          </p>
        )}
      </section>

      <footer className="p-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Neoigloo
      </footer>
    </main>
  );
}
