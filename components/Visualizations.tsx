'use client';

export default function Visualizations() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Patient Distribution by Age</h4>
        <div className="bg-slate-100 h-64 rounded flex items-center justify-center text-slate-500">
          [Chart: Age Distribution]
        </div>
        <p className="text-sm text-slate-600 mt-3">Distribution shows peak sensitivity in 18-45 age group</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Top 10 Allergens by Sensitivity Rate</h4>
        <div className="bg-slate-100 h-64 rounded flex items-center justify-center text-slate-500">
          [Chart: Top Allergens]
        </div>
        <p className="text-sm text-slate-600 mt-3">Pollen allergens (Bet_v_1, Phl_p_1) show highest sensitivity rates</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Allergen Correlation Heatmap</h4>
        <div className="bg-slate-100 h-64 rounded flex items-center justify-center text-slate-500">
          [Chart: Correlation Heatmap]
        </div>
        <p className="text-sm text-slate-600 mt-3">High correlation between pollen allergen groups reveals cross-reactivity patterns</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Risk Stratification by Allergen Profile</h4>
        <div className="bg-slate-100 h-64 rounded flex items-center justify-center text-slate-500">
          [Chart: Risk Distribution]
        </div>
        <p className="text-sm text-slate-600 mt-3">25% high-risk patients characterized by multi-allergen sensitization</p>
      </div>
    </div>
  );
}
