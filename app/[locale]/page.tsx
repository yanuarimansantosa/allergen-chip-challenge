import { useTranslations } from 'next-intl';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';

export default function Home() {
  const t = useTranslations();

  return (
    <main className="w-full">
      <Navigation />
      <Hero />
      <Dashboard />
      <Footer />
    </main>
  );
}
