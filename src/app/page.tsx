'use client';

export default function HomePage() {
  const openTelegram = () => {
    window.open("https://t.me/whatuknow", "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <button
        onClick={openTelegram}
        className="px-6 py-3 bg-sky-500 text-white text-lg rounded-lg shadow-lg hover:bg-sky-600 transition"
      >
        ✈️ Написать в Telegram
      </button>
    </div>
  );
}
