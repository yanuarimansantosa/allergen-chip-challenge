'use client';

import { useTranslations } from 'next-intl';

const techniques = [
  { name: 'classification', icon: '📊', color: 'blue' },
  { name: 'prediction', icon: '🔮', color: 'purple' },
  { name: 'pattern_recognition', icon: '🧩', color: 'green' },
  { name: 'clustering', icon: '🎯', color: 'orange' },
  { name: 'anomaly_detection', icon: '⚠️', color: 'red' },
  { name: 'discovery_ai', icon: '💡', color: 'yellow' },
  { name: 'recommendation', icon: '👍', color: 'pink' },
  { name: 'behavioral_ai', icon: '👥', color: 'indigo' },
  { name: 'xai', icon: '🔍', color: 'cyan' },
  { name: 'cdss', icon: '🏥', color: 'emerald' },
  { name: 'generative_ai', icon: '✨', color: 'violet' },
  { name: 'multimodal_ai', icon: '🎨', color: 'fuchsia' },
  { name: 'longitudinal_ai', icon: '📈', color: 'sky' },
  { name: 'reinforcement_learning', icon: '🤖', color: 'amber' },
  { name: 'digital_phenotyping', icon: '🧬', color: 'teal' },
  { name: 'risk_stratification', icon: '⚖️', color: 'rose' },
  { name: 'survival_modeling', icon: '⏱️', color: 'slate' },
  { name: 'causal_ai', icon: '🔗', color: 'lime' },
  { name: 'federated_learning', icon: '🌐', color: 'blue' },
  { name: 'agentic_ai', icon: '🤖', color: 'purple' },
];

export default function TechniqueGrid() {
  const t = useTranslations('ai_techniques');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {techniques.map((tech) => (
        <div
          key={tech.name}
          className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="text-4xl mb-3">{tech.icon}</div>
          <h3 className="font-semibold text-slate-900">{t(tech.name)}</h3>
          <p className="text-xs text-slate-500 mt-2">Advanced ML Analysis</p>
        </div>
      ))}
    </div>
  );
}
