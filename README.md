
# BloomWatch 🌸🛰️

> **NASA Space Apps Challenge 2025 Submission**

BloomWatch is a full-stack web platform for tracking global flowering and pollination data, empowering communities, researchers, and farmers with real-time insights, AI-powered recommendations, and interactive maps. Built for the NASA Space Apps Challenge 2025.

---

## 🚀 Live Demo

- **Frontend (Netlify):** [https://bloomwatchrp.netlify.app](https://bloomwatchrp.netlify.app)
- **Backend API (Railway):** _Contact for API endpoint_

---

## 🌟 Features

- **Interactive Maps:** Visualize pollinator zones (Green, Yellow, Red) globally
- **Crop & Flower Suggestions:** Smart recommendations based on your location
- **Real-time Data:** Weather and NASA satellite data integration
- **Community Observations:** Upload and share pollination data
- **AI-Powered Insights:** Intelligent pollination and flowering predictions
- **User Authentication:** Secure login, registration, and profile management
- **Global Coverage:** Analyze any country and region in detail
- **Modern UI:** Responsive, accessible, and beautiful interface

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React (with Vite)
- **Language:** TypeScript
- **UI:** shadcn/ui, Tailwind CSS, Radix UI
- **Maps:** Google Maps API, Leaflet, React-Leaflet
- **State/Data:** React Query, React Hook Form, Zod
- **Visualization:** Recharts, Embla Carousel

### Backend
- **Runtime:** Node.js (18+)
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM/Query:** Native pg
- **APIs:** NASA Earth Observatory, OpenWeather, WeatherAPI
- **Security:** JWT Auth, bcryptjs, Helmet, Rate Limiting, CORS
- **Scheduling:** node-cron

### DevOps & Deployment
- **Frontend:** Netlify
- **Backend:** Railway
- **CI/CD:** GitHub Actions (recommended)

---

## 📦 Installation & Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env # Add your credentials
npm run migrate      # Run DB migrations
npm run seed         # (Optional) Seed DB
npm run dev          # Start dev server
```

### Frontend
```bash
cd frontend
npm install
npm run dev          # Start Vite dev server
```

---

## 📚 Usage

1. Register or log in to access all features.
2. Explore the interactive map for pollinator zones and observations.
3. Add your own observations and contribute to the global dataset.
4. Get crop/flower suggestions and AI-powered insights for your region.

---

## 🧑‍💻 Contributing

We welcome contributions! Please fork the repo, create a branch, and submit a pull request. For major changes, open an issue first to discuss what you’d like to change.

---

## 👨‍🚀 Team & Credits

- NASA Space Apps Challenge 2025 Team: ripro805 & contributors
- NASA, OpenWeather, and all open-source library authors

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

