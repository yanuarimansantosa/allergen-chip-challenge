'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n.config';

export default function Navigation() {
  const locale = useLocale();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">🧬</div>
            <h1 className="text-xl font-bold text-slate-900">Allergen Challenge</h1>
          </div>

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-6">
              <a href="#overview" className="text-slate-600 hover:text-slate-900">Analysis</a>
              <a href="#insights" className="text-slate-600 hover:text-slate-900">Insights</a>
              <a href="#techniques" className="text-slate-600 hover:text-slate-900">Techniques</a>
            </div>

            <div className="flex space-x-2 border-l border-slate-200 pl-4">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    locale === loc
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {loc.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
