'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const YM_ID = process.env.NEXT_PUBLIC_YM_ID;

export default function YandexMetrica() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Отправляем hit при первом рендере и при смене роутов
  useEffect(() => {
    if (!YM_ID || typeof window === 'undefined' || typeof (window as any).ym !== 'function') return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    (window as any).ym(Number(YM_ID), 'hit', url);
  }, [pathname, searchParams]);

  return (
    <>
      <Script id="ym-loader" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0];
          k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${YM_ID}, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });
        `}
      </Script>

      <noscript>
        <div>
          <img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
        </div>
      </noscript>
    </>
  );
}
