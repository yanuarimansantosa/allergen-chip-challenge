'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-slate-50 pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-2xl text-blue-600 font-semibold mb-4">
            {t('subtitle')}
          </p>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
            {t('description')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-3xl font-bold text-blue-600">4,271</div>
              <div className="text-sm text-slate-600">Patients Analyzed</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-3xl font-bold text-green-600">12</div>
              <div className="text-sm text-slate-600">Laboratories</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-3xl font-bold text-purple-600">20</div>
              <div className="text-sm text-slate-600">AI Techniques</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-3xl font-bold text-orange-600">~800</div>
              <div className="text-sm text-slate-600">Allergen Types</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
