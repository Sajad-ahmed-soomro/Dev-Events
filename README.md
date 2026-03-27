# DevEvent - Event Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8)](https://tailwindcss.com/)
[![PostHog](https://img.shields.io/badge/PostHog-Analytics-orange)](https://posthog.com/)

A modern event management platform built with Next.js, MongoDB, and Cloudinary. Create, discover, and manage tech events with ease.

## 🔗 Live Demo

**Visit the live application:** [https://dev-events-six-swart.vercel.app](https://dev-events-six-swart.vercel.app)

Explore events, create new tech gatherings, and discover hackathons, meetups, and conferences all in one place!

## 📸 Screenshots

<img width="1394" height="803" alt="image" src="https://github.com/user-attachments/assets/783d19b0-89fc-4ef9-b714-816816231fdc" />

## ✨ Features

- 🎨 **Modern UI** - Dark theme with gradient accents and glass morphism
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- 📝 **Create Events** - Rich form with dynamic agenda and tags
- 🖼️ **Image Upload** - Cloudinary integration with preview and remove options
- 🔍 **Browse Events** - Grid layout with loading skeletons
- 📊 **Analytics** - PostHog integration for user tracking
- ⚡ **Fast Performance** - Suspense boundaries and optimized caching
- 🛡️ **Type Safe** - Full TypeScript support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account for image hosting
- PostHog account for analytics (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Sajad-ahmed-soomro/Dev-Events.git
cd Dev-Events
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dev-events?retryWrites=true&w=majority
MONGODB_DB_NAME=dev-events

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=DevEvent
```

4. **Run development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## 📁 Project Structure

```
devevent/
├── app/
│   ├── api/
│   │   └── events/
│   │       └── route.ts          # Events API endpoints
│   ├── create-event/
│   │   └── page.tsx              # Create event page
│   ├── events/
│   │   └── page.tsx              # Events listing page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── CreateEventForm.tsx       # Event creation form
│   ├── EventCard.tsx             # Event card component
│   ├── EventsList.tsx            # Events listing component
│   ├── EventsLoading.tsx         # Loading skeleton
│   ├── Navbar.tsx                # Navigation bar
│   └── providers/
│       └── PostHogProvider.tsx   # PostHog analytics provider
├── lib/
│   ├── mongodb.ts                # MongoDB connection
│   └── cloudinary.ts             # Cloudinary configuration
├── models/
│   └── Event.ts                  # Mongoose event model
├── types/
│   └── env.d.ts                  # Environment types
├── screenshots/                  # Screenshots for README
├── .env.local                    # Environment variables
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
└── package.json
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 16](https://nextjs.org/) with App Router |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [TailwindCSS](https://tailwindcss.com/) |
| Database | [MongoDB](https://www.mongodb.com/) with Mongoose |
| Image Hosting | [Cloudinary](https://cloudinary.com/) |
| Analytics | [PostHog](https://posthog.com/) |
| Icons | [Font Awesome](https://fontawesome.com/) |
| Fonts | Schibsted Grotesk & Martian Mono |

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 📝 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `MONGODB_DB_NAME` | Database name | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key | No |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host URL | No |
| `NEXT_PUBLIC_BASE_URL` | Base URL for API calls | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | No |

## 🔧 How to Get API Keys

### MongoDB
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Click "Connect" → "Drivers"
4. Copy the connection string

### Cloudinary
1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Find your cloud name, API key, and API secret in Account Details

### PostHog
1. Go to [PostHog](https://app.posthog.com)
2. Create a project
3. Go to Project Settings → Project API Key

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [PostHog Documentation](https://posthog.com/docs)

---

Built with ❤️ using Next.js
```

I've added a **"🔗 Live Demo"** section right after the description, with your live URL: `https://dev-events-six-swart.vercel.app`. This makes it easy for anyone viewing the README to immediately access and try out your deployed application.
