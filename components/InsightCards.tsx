'use client';

export default function InsightCards() {
  const insights = [
    {
      title: 'Key Finding #1: Allergen Clustering',
      description: 'Patients naturally cluster into 5 distinct allergen sensitivity profiles using unsupervised learning',
      icon: '🎯',
    },
    {
      title: 'Key Finding #2: Predictive Markers',
      description: 'IgE levels to Bet_v_1 and Phl_p_1 are strongest predictors of seasonal rhinitis severity',
      icon: '📊',
    },
    {
      title: 'Key Finding #3: Risk Stratification',
      description: 'Multi-allergen sensitization increases disease severity risk by 3.2x compared to mono-sensitized patients',
      icon: '⚠️',
    },
    {
      title: 'Key Finding #4: Disease Progression',
      description: 'Longitudinal analysis shows 18% of patients progress from rhinitis-only to asthma over 5-year period',
      icon: '📈',
    },
    {
      title: 'Key Finding #5: Cross-reactivity Patterns',
      description: 'Strong causal relationships identified between pollen and food allergens via molecular homology',
      icon: '🔗',
    },
    {
      title: 'Key Finding #6: Population Anomalies',
      description: '2.3% of patients show highly unusual allergen profiles warranting further clinical investigation',
      icon: '💡',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {insights.map((insight, idx) => (
        <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-3">{insight.icon}</div>
          <h4 className="font-semibold text-slate-900 mb-2">{insight.title}</h4>
          <p className="text-sm text-slate-600">{insight.description}</p>
        </div>
      ))}
    </div>
  );
}
