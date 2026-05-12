'use client';

import { useTranslations } from 'next-intl';
import TechniqueGrid from './TechniqueGrid';
import Visualizations from './Visualizations';
import InsightCards from './InsightCards';

export default function Dashboard() {
  const t = useTranslations('dashboard');

  return (
    <section id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">{t('overview')}</h2>
        <p className="text-slate-600">Analysis of allergen sensitization patterns across 4,271 patients</p>
      </div>

      <div id="techniques" className="mb-20">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">{t('techniques')}</h3>
        <TechniqueGrid />
      </div>

      <div id="insights" className="mb-20">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">{t('overview')}</h3>
        <InsightCards />
      </div>

      <div className="mb-20">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">Key Visualizations</h3>
        <Visualizations />
      </div>
    </section>
  );
}
