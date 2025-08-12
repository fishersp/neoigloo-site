const webUrl = "https://t.me/neoigloo";
const tgUrl = "tg://resolve?domain=neoigloo";

const openTelegramSmart = () => {
    const ua = navigator.userAgent || navigator.vendor || "";
    const isIOS = /iPad|iPhone|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);

    let fallbackTimer = null;
    const clear = () => { if (fallbackTimer) { clearTimeout(fallbackTimer); fallbackTimer = null; } };
    const onVisibility = () => { if (document.visibilityState === "hidden") clear(); };
    document.addEventListener("visibilitychange", onVisibility, { once: true });

    if (isIOS) {
        fallbackTimer = window.setTimeout(() => { window.location.href = webUrl; }, 800);
        window.location.href = tgUrl;
        return;
    }

    if (isAndroid) {
        const intentPrimary = "intent://resolve?domain=neoigloo#Intent;scheme=tg;package=org.telegram.messenger;S.browser_fallback_url=https%3A%2F%2Ft.me%2Fneoigloo;end";
        const intentAlt = "intent://resolve?domain=neoigloo#Intent;scheme=tg;package=org.thunderdog.challegram;S.browser_fallback_url=https%3A%2F%2Ft.me%2Fneoigloo;end";
        try { window.location.href = intentPrimary; }
        catch { try { window.location.href = intentAlt; } catch { window.location.href = webUrl; } }
        return;
    }

    try {
        const a = document.createElement("a");
        a.href = tgUrl;
        a.style.display = "none";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { try { document.body.removeChild(a); } catch { } }, 1500);
    } catch { }
    fallbackTimer = window.setTimeout(() => { window.location.href = webUrl; }, 700);
};

<button
    type="button"
    onClick={openTelegramSmart}
    className="px-4 py-2 rounded text-white bg-sky-500"
>
    ✈️ Написать в Telegram (@neoigloo)
</button>
