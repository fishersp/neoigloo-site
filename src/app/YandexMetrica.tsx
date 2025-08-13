'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID ?? 0);

export default function YandexMetrica() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Отправка дополнительного hit при SPA-навигации
  useEffect(() => {
    if (typeof window === 'undefined' || !YM_ID) return;
    const ym = (window as any).ym;
    if (!ym) return;
    const url =
      pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    ym(YM_ID, 'hit', url);
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        id="ym"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0];
            k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${YM_ID}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true,
              trackHash:true
            });
          `,
        }}
      />
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
