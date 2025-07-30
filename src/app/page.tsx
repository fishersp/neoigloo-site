'use client';

import { useState } from "react";

export default function HomePage() {
  const [size, setSize] = useState(20);
  const [price, setPrice] = useState(350000);
  const [phone, setPhone] = useState("+7 (");

  const calculatePrice = (value: number) => {
    setSize(value);
    if (value === 20) setPrice(350000);
    if (value === 30) setPrice(490000);
    if (value === 40) setPrice(620000);
  };

  const formatPhone = (value: string) => {
    let digits = value.replace(/\D/g, "");
    if (digits.startsWith("7")) digits = digits.slice(1);

    let result = "+7";
    if (digits.length > 0) result += " (" + digits.substring(0, 3);
    if (digits.length >= 4) result += ") " + digits.substring(3, 6);
    if (digits.length >= 7) result += "-" + digits.substring(6, 8);
    if (digits.length >= 9) result += "-" + digits.substring(8, 10);

    return result;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const isPhoneValid = phone.replace(/\D/g, "").length === 11;

  // Отправка в Telegram через webhook
  const handleTelegram = async () => {
    await fetch("https://eossql2drcvw11x.m.pipedream.net", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, size, price }),
    });
    alert("Заявка отправлена в Telegram!");
  };

  // Переход в WhatsApp с текстом
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Здравствуйте! Хочу заказать дом Neoigloo ${size} м² за ${price} ₽`
    );
    window.open(`https://wa.me/79990000000?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold">Купите дом в форме купола</h1>
        <p className="text-lg text-gray-500">
          Комфортные и стильные дома для отдыха на природе
        </p>
      </header>

      <section className="p-6 max-w-xl mx-auto bg-gray-50 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Калькулятор цены</h2>
        <select
          className="border p-2 rounded w-full"
          value={size}
          onChange={(e) => calculatePrice(Number(e.target.value))}
        >
          <option value={20}>Дом 20 м²</option>
          <option value={30}>Дом 30 м²</option>
          <option value={40}>Дом 40 м²</option>
        </select>

        <p className="text-xl mt-4">Цена: {price.toLocaleString()} ₽</p>

        <img
          src={`/house${size}.jpg`}
          alt="Дом"
          className="mt-4 rounded-lg shadow-md"
        />
      </section>

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
            onClick={handleTelegram}
            disabled={!isPhoneValid}
            className={`px-4 py-2 rounded text-white ${isPhoneValid ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            📩 Отправить в Telegram
          </button>

          <button
            onClick={handleWhatsApp}
            disabled={!isPhoneValid}
            className={`px-4 py-2 rounded text-white ${isPhoneValid ? "bg-green-500" : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            💬 Написать в WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}
