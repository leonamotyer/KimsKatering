# Kim's Catering Website

A beautiful, responsive website for Kim's Catering - a local bakery and catering service in Strathmore, Alberta. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🍰 About Kim's Catering

Kim's Catering has been serving the Strathmore community for over 9 years, specializing in homemade pies, fresh-baked buns, delicate butter horns, and custom cakes made with real cream and premium Callebaut chocolate. Located at Bay #1 - 70 Slater Rd, Strathmore, Alberta.

## ✨ Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI**: Clean, elegant design with Victorian-inspired animations
- **Custom Color Scheme**: Soft golden brown baguette color palette
- **Interactive Contact Form**: Built-in form handling with validation
- **Event Management**: Comprehensive event types and customization options
- **Menu Showcase**: Detailed menu with pricing and descriptions
- **Performance Optimized**: Built with Next.js 15 and Turbopack for fast loading

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Fonts**: Inter & Playfair Display (Google Fonts)
- **Icons**: Flaticon
- **Build Tool**: Turbopack
- **Linting**: ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kims-katering
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
kims-katering/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page with form
│   │   ├── events/            # Events page
│   │   ├── menu/              # Menu page
│   │   ├── globals.css        # Global styles & CSS variables
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── componenets/           # Reusable components
│   │   ├── header.tsx         # Navigation header
│   │   ├── footer.tsx         # Site footer
│   │   └── victorian-animation.tsx # Decorative border
│   └── data/                  # Static data
│       ├── events.json        # Event information
│       └── menu.json          # Menu data
├── public/                    # Static assets
│   ├── bread.jpg             # Hero image
│   ├── cake.png              # Cake image
│   ├── fork.png              # Fork icon
│   └── logo.png              # Company logo
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Design System

### Color Palette
The website uses a custom golden brown baguette color scheme:

- **Primary**: `#c4a882` - Main golden brown
- **Light**: `#e2d4b8` - Light cream
- **Medium**: `#b89a6f` - Medium brown
- **Dark**: `#9d7f5a` - Dark brown
- **Muted**: `#a8906f` - Muted brown
- **Subtle**: `#f0e8d8` - Very light background

### Typography
- **Headings**: Playfair Display (serif)
- **Body Text**: Inter (sans-serif)

## 📱 Pages

- **Home**: Hero section, services overview, about section
- **About**: Company story, specialties, contact CTA
- **Menu**: Detailed menu with pricing and descriptions
- **Events**: Event types, customization options, special services
- **Contact**: Contact form, phone/email, additional information

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📞 Contact Information

- **Phone**: 403-497-9338
- **Email**: kim@kimskatering.ca
- **Location**: Bay #1 - 70 Slater Rd, Strathmore, Alberta

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Kim's Catering.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Flaticon](https://www.flaticon.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

**Kim's Catering** - Where love is baked into every bite! 🥖✨# KimsKatering
