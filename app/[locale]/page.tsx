'use client';

export const dynamic = 'force-dynamic';

import { useTranslations } from 'next-intl';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';
import PredictionForm from '@/components/PredictionForm';
import Footer from '@/components/Footer';

export default function Home() {
  const t = useTranslations();

  return (
    <main className="w-full">
      <Navigation />
      <Hero />
      <Dashboard />
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Test Prediction Engine
          </h2>
          <PredictionForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
