"use client";

import { useState } from "react";
import Link from "next/link";

export default function HousesPage() {
  const [size, setSize] = useState<number>(120);
  const [price, setPrice] = useState<number>(4500000);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl p-10 text-center">
        
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Купольные Дома NeoIgloo
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Современные и энергоэффективные дома будущего.  
          Быстрая сборка, долговечные материалы и уникальный дизайн.
        </p>

        <div className="mb-8">
          <label className="block text-gray-700 mb-2 font-medium">
            Площадь дома (м²)
          </label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="border rounded-lg px-4 py-2 text-center w-40"
          />
        </div>

        <div className="text-2xl font-semibold text-gray-800 mb-8">
          Цена: {price.toLocaleString()} ₽
        </div>

        <button
          onClick={() => alert("Заявка отправлена!")}
          className="px-8 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
        >
          Получить консультацию
        </button>

        <div className="mt-10 text-gray-500">
          <Link href="/" className="underline hover:text-gray-700">
            ← Вернуться к NeoIgloo
          </Link>
        </div>
      </div>
    </main>
  );
}
