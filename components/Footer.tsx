'use client';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">About Dataset</h3>
            <p className="text-sm text-slate-400">
              Allergen Chip Challenge dataset containing 4,271 patient profiles from 12 French allergology laboratories
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Data Source</h3>
            <p className="text-sm text-slate-400">
              Source: data.gouv.fr - French Government Open Data<br/>
              License: Open Licence 2.0
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Technologies</h3>
            <p className="text-sm text-slate-400">
              Next.js • React • TypeScript • Tailwind CSS • ML/AI Analysis
            </p>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <p className="text-center text-sm text-slate-400">
            © 2024 Allergen Chip Challenge Analysis. Built with AI & Open Data.
          </p>
        </div>
      </div>
    </footer>
  );
}
