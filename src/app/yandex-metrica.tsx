'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

// Тип функции ym без использования `any`
type YMFn = (
  counterId: number,
  method: 'init' | 'hit' | 'reachGoal' | 'params' | 'userParams',
  ...args: unknown[]
) => void;

declare global {
  interface Window {
    ym?: YMFn;
  }
}

const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID || 0);

export default function YandexMetrica() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Инициализация счётчика
  useEffect(() => {
    if (!YM_ID) return;

    window.ym?.(YM_ID, 'init', {
      defer: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
  }, []);

  // Хиты для SPA при смене маршрута/параметров
  useEffect(() => {
    if (!YM_ID) return;
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname || '/';
    window.ym?.(YM_ID, 'hit', url);
  }, [pathname, searchParams]);

  return (
    <>
      {/* Подключение тега метрики */}
      <Script
        id="ym-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            k=e.createElement(t),a=e.getElementsByTagName(t)[0];
            k.async=1;k.src=r;a.parentNode&&a.parentNode.insertBefore(k,a);
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          `,
        }}
      />
      {/* noscript — просто предупреждение от eslint про <img>, но это не ошибка */}
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YM_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
