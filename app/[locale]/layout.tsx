import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n.config';
import '@/globals.css';

export const metadata: Metadata = {
  title: 'Allergen Chip Challenge - AI Analysis',
  description: 'Advanced AI-powered analysis of allergen sensitization patterns',
  keywords: 'allergen, immunology, machine learning, classification, prediction',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="bg-slate-50 text-slate-900">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
