# Allergen Chip Challenge - AI Analysis Platform

Advanced AI-powered analysis of allergen sensitization patterns from 4,271 patient profiles.

## 🧬 Project Overview

This platform implements **20 AI techniques** to analyze the Allergen Chip Challenge dataset:

### Core Techniques
- **Classification** - Allergen type & sensitivity classification
- **Prediction** - Severity & disease progression prediction  
- **Pattern Recognition** - Allergen sensitivity patterns
- **Clustering** - Patient cohort identification
- **Anomaly Detection** - Unusual profiles detection
- **Risk Stratification** - Patient risk categorization
- **Explainable AI (XAI)** - Interpretable model decisions
- **Clinical Decision Support** - Diagnosis assistance

### Advanced Techniques
- Discovery AI, Recommendation Systems, Behavioral AI
- Generative AI, Multimodal AI, Longitudinal AI
- Reinforcement Learning, Digital Phenotyping
- Survival/Progression Modeling, Causal AI
- Federated Learning, Agentic AI

## 📊 Dataset

- **Source**: data.gouv.fr (French Government Open Data)
- **Patients**: 4,271 allergen profiles
- **Laboratories**: 12 French allergology centers
- **Period**: 2012-2023
- **Allergens Analyzed**: ~800 different allergen types
- **License**: Open Licence 2.0

## 🛠️ Tech Stack

```
Frontend: Next.js 14 + React + TypeScript
Styling: Tailwind CSS + shadcn/ui
Visualization: Recharts + Plotly
Internationalization: next-intl (EN/ID/FR)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yanuarimansantosa/allergen-chip-challenge.git
cd allergen-chip-challenge

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Build for Production

```bash
npm run build
npm start
```

## 📍 Deployment

### To VPS (allergen-chip-challenge.medinovatech.com)

```bash
# Build
npm run build

# Deploy via SSH
./scripts/deploy.sh
```

### Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://allergen-chip-challenge.medinovatech.com
```

## 📈 Key Insights

- **5 Patient Clusters** identified with distinct allergen profiles
- **3.2x Risk Increase** for multi-allergen sensitized patients
- **18% Disease Progression** from rhinitis to asthma (5-year)
- **Top Allergens**: Bet_v_1, Phl_p_1, Der_p_1, Ara_h_2
- **2.3% Anomalous Profiles** requiring clinical investigation

## 🌐 Multilingual Support

- 🇬🇧 English
- 🇮🇩 Indonesian  
- 🇫🇷 French

## 📚 Documentation

- [Data Processing Guide](./docs/data-processing.md)
- [API Documentation](./docs/api.md)
- [ML Techniques Guide](./docs/ml-techniques.md)
- [Deployment Guide](./docs/deployment.md)

## 👤 Author

Yanuar Santosa (@yanuarimansantosa)

## 📄 License

Open Licence 2.0 (matching source data)

---

**Last Updated**: May 2024
