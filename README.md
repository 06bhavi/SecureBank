# SecureBank - Fraud Detection System

SecureBank is a modern, real-time Fraud Detection System dashboard built with React. It provides an intuitive interface for monitoring financial transactions, analyzing risk patterns, and generating alerts for suspicious activities in real-time.

## Features

- **Real-Time Dashboard**: Comprehensive overview of transaction monitoring, risk analysis, and key metrics.
- **Live Monitoring**: A live stream of transactions with instant risk scoring and status updates. Features a pause/resume function for detailed inspection.
- **Advanced Analytics**: Deep dive into fraud patterns and risk distribution using interactive charts.
- **Alert System**: Real-time notifications for high-risk and critical transactions based on simulated risk scores.
- **Responsive UI**: A sleek, dark-themed interface with modern glassmorphism effects, built with Tailwind CSS.

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts & Data Visualization**: Recharts

## Risk Scoring Logic

The system includes a simulated real-time transaction generator that evaluates risk based on several factors:
- **Transaction Amount**: Unusually high amounts increase the risk score.
- **Location**: Transactions from certain foreign or high-risk locations trigger flags.
- **Merchant**: Transactions with unknown or suspicious merchants are flagged.
- **Time Anomaly**: Transactions occurring during unusual hours (e.g., late night/early morning) increase the risk score.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository (if applicable) or navigate to the project directory:
   ```bash
   cd "secure bank"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the development server with Vite:
```bash
npm run dev
```

Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

## Project Structure

- `src/App.jsx`: The main application component containing the Dashboard, Live Monitor, and Analytics views.
- `src/index.css`: Global styles and Tailwind directives.
- `src/main.jsx`: Application entry point.
- `package.json`: Project dependencies and scripts.
- `vite.config.js` & `tailwind.config.js`: Configuration files for Vite and Tailwind CSS.
