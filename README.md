# Sam Eden Resort - Web Application

A responsive modern web application for **Sam Eden Resort** (Bidadi, Ramanagara near Bangalore). Built with React 18, Vite, TypeScript, and Tailwind CSS.

## 🌿 Highlights

- **Day Outing & Overnight Stay Packages:** Detailed breakdown of standard/discounted packages for day outings, couple cottages, 4-sharing cottages, dormitory stays, and tent camping.
- **Interactive Media Gallery:** Filterable photo albums and video showcase with modal lightbox viewer.
- **Dynamic Pricing Drawer:** Client pricing calculation and tax-inclusive breakdown.
- **Direct WhatsApp & Phone Booking Desk:** Direct booking desk integrations with pre-filled enquiry messages.
- **Location & Google Maps Integration:** Embedded map navigation and direct distance guide from Bangalore.
- **Fully Responsive:** Optimized for mobile phones, tablets, iPads, laptops, and ultra-wide screens.

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` (or the port specified in terminal output).

### 3. Build for Production
```bash
npm run build
```

The production output will be generated in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📂 Project Structure

```
├── public/                 # Static assets (images, videos, logo, manifest)
├── scripts/                # Automated verification and capture scripts
├── src/
│   ├── components/         # Reusable UI components (Navbar, Footer, Lightbox, etc.)
│   ├── context/            # React context providers (PricingContext)
│   ├── data/               # Resort data, pricing configs, gallery definitions
│   ├── lib/                # Utility helpers and enquiry service
│   ├── sections/           # Landing page sections (Hero, Accommodations, Activities, etc.)
│   ├── types/              # TypeScript interfaces and types
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global Tailwind styles
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 📄 License
Private project. All rights reserved.
