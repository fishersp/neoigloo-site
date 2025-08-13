import './globals.css';
import YandexMetrica from './YandexMetrica';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <YandexMetrica />
        {children}
      </body>
    </html>
  );
}
