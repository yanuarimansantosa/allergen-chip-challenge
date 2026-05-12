'use client';

import { useState } from 'react';
import { usePrediction } from '@/hooks/useApi';

export default function PredictionForm() {
  const { prediction, loading, error, predict } = usePrediction();
  const [formData, setFormData] = useState({
    patient_age: 35,
    allergen_type: 'Bet_v_1',
    igg_level: 2.5,
    symptom_severity: 3,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await predict(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Allergen Prediction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Age
          </label>
          <input
            type="number"
            name="patient_age"
            value={formData.patient_age}
            onChange={handleChange}
            min="0"
            max="120"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Allergen Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Allergen Type
          </label>
          <select
            name="allergen_type"
            value={formData.allergen_type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Bet_v_1">Bet v 1 (Birch pollen)</option>
            <option value="Phl_p_1">Phl p 1 (Timothy grass)</option>
            <option value="Der_p_1">Der p 1 (Dust mite)</option>
            <option value="Ara_h_2">Ara h 2 (Peanut)</option>
            <option value="Fel_d_1">Fel d 1 (Cat)</option>
            <option value="Can_f_1">Can f 1 (Dog)</option>
          </select>
        </div>

        {/* IgG Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IgG Level (0-10)
          </label>
          <input
            type="number"
            name="igg_level"
            value={formData.igg_level}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Symptom Severity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Symptom Severity (0-5)
          </label>
          <input
            type="number"
            name="symptom_severity"
            value={formData.symptom_severity}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Predicting...' : 'Get Prediction'}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-semibold">Error</p>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Prediction Results */}
      {prediction && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-semibold mb-4">Prediction Results</p>

          <div className="space-y-4">
            {/* Individual Predictions */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Individual Model Predictions</p>
              <div className="bg-white p-3 rounded border border-gray-200 space-y-2">
                {prediction.individual_predictions && Object.entries(prediction.individual_predictions).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-semibold text-gray-800">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ensemble Prediction */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Ensemble Prediction</p>
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-lg font-bold text-blue-600">
                  {Array.isArray(prediction.ensemble_prediction)
                    ? prediction.ensemble_prediction.join(', ')
                    : prediction.ensemble_prediction}
                </p>
              </div>
            </div>

            {/* Confidence */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Confidence Score</p>
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-green-600 h-full transition-all duration-300"
                      style={{ width: `${Math.min(prediction.confidence * 20, 100)}%` }}
                    />
                  </div>
                  <p className="text-lg font-bold text-gray-800">
                    {(prediction.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
