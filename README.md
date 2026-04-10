# Kim's Katering Website

A beautiful, responsive website for Kim's Katering - a local bakery and Katering service in Strathmore, Alberta. Built with Next.js 15, TypeScript, Tailwind CSS, and Resend api. 

## 🍰 About Kim's Katering

stage: kims-katering.vercel.app

Kim's Katering has been serving the Strathmore community for over 9 years, specializing in homemade pies, fresh-baked buns, delicate butter horns, and custom cakes made with real cream and premium Callebaut chocolate. Located at Bay #1 - 70 Slater Rd, Strathmore, Alberta.

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
cd kims-Katering
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
kims-Katering/
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
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once

## 📞 Contact Information

- **Phone**: 403-497-9338
- **Email**: info@kimsKatering.ca
- **Location**: Bay #1 - 70 Slater Rd, Strathmore, Alberta

## 🚀 Deployment

### Environment Variables

**IMPORTANT**: You must set the following environment variables in your deployment platform (Vercel, etc.) for email functionality to work:

#### Required:
- `RESEND_API_KEY` - Your Resend API key (get it from [resend.com](https://resend.com/api-keys))

#### Optional:
- `FROM_EMAIL` - Email address to send from (defaults to `onboarding@resend.dev`)
- `FROM_NAME` - Name to display as sender (defaults to `Kim's Katering`)
- `CONTACT_DEFAULT_TO` - Email address where contact form submissions are sent (defaults to `kimskateringstrathmore@gmail.com`)

### Setting Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - Click **Add New**
   - Enter the variable name (e.g., `RESEND_API_KEY`)
   - Enter the value
   - Select the environments (Production, Preview, Development)
   - Click **Save**
4. **Redeploy** your application after adding variables

### Vercel (Recommended)
The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. **Set environment variables** (see above)
4. Deploy automatically

### Other Platforms
This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

**Note**: Make sure to set the environment variables in your chosen platform's settings.

## 🧪 Testing

The project includes integration tests for the email service to ensure emails are sent correctly.

### Running Tests

1. **Unit Tests (Mocked)**: Run tests with mocked Resend API (fast, no actual emails sent)
   ```bash
   npm test
   ```

2. **Integration Tests (Real Emails)**: Run tests that actually send emails to test addresses
   ```bash
   # Set test environment variables first
   export TEST_EMAIL_TO=your-test-email@example.com
   export TEST_EMAIL_CUSTOMER=test-customer@example.com
   export RESEND_API_KEY=your_resend_api_key
   
   npm test -- route.integration.test.ts
   ```

### Test Environment Variables

For integration tests that actually send emails, set these environment variables:
- `TEST_EMAIL_TO` - Test email address to receive inquiry emails (instead of real client email)
- `TEST_EMAIL_CUSTOMER` - Test email address for customer confirmation emails
- `RESEND_API_KEY` - Your Resend API key

**Important**: Always use test email addresses, never the production client email address!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Kim's Katering.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Flaticon](https://www.flaticon.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

**Kim's Katering** - Where love is baked into every bite! 🥖✨# KimsKatering
