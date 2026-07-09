import Image from "next/image";
import { Metadata } from "next";
import CurveDivider from "./componenets/curve-divider";

export const metadata: Metadata = {
  title: "Kim's Katering - Premium Katering Services in Strathmore, Alberta",
  description: "Professional Katering services in Strathmore, Alberta. Specializing in weddings, corporate events, funerals, and special occasions. Fresh, homemade food made with love and attention to detail.",
  keywords: [
    "catering Strathmore",
    "wedding catering Alberta",
    "corporate catering",
    "funeral catering",
    "event catering",
    "homemade food",
    "fresh catering",
    "Kim's Catering",
    "Strathmore catering",
    "Alberta catering services"
  ],
  openGraph: {
    title: "Kim's Katering - Premium Katering Services in Strathmore, Alberta",
    description: "Professional Katering services in Strathmore, Alberta. Fresh, homemade food for all occasions.",
    images: ['/og-image.jpg'],
  },
};

export default function Home() {
  return (
    <main className="page-shell">
      <section className="relative flex h-[92vh] w-full items-center justify-center overflow-hidden" role="banner" aria-label="Kim's Katering Hero Section">
        <Image
          src="/bread.jpg"
          alt="Fresh artisan bread and baked goods from Kim's Katering in Strathmore, Alberta"
          fill
          className="scale-105 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3c2e1f]/60 via-[#3c2e1f]/30 to-[var(--muted-warm)]" aria-hidden="true" />
        <div className="relative z-10 px-6 text-center text-white">
          <h1 className="mb-6 text-6xl drop-shadow-sm md:text-8xl">
            Kim&apos;s Katering
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-white/90 md:text-2xl">
            Professional Katering services for weddings, corporate events, and special occasions in Strathmore, Alberta
          </p>
          <nav aria-label="Main navigation">
            <a
              href="/menu"
              className="ui-btn-white"
              aria-label="View our Katering menu"
            >
              View Menu
            </a>
          </nav>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24 pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="ui-card p-10 text-center">
              <div className="ui-icon-circle mx-auto mb-6 h-20 w-20">
                <i className="fi fi-rr-ring text-3xl text-[var(--baguette-dark)]"></i>
              </div>
              <h3 className="mb-4 text-2xl text-[var(--foreground)]">Wedding Katering</h3>
              <p className="leading-relaxed text-[var(--muted-text)]">
                Elegant and delicious meals for your special day. Custom menus tailored to your preferences.
              </p>
            </div>
            <div className="ui-card p-10 text-center">
              <div className="ui-icon-circle mx-auto mb-6 h-20 w-20">
                <i className="fi fi-rr-building text-3xl text-[var(--baguette-dark)]"></i>
              </div>
              <h3 className="mb-4 text-2xl text-[var(--foreground)]">Corporate Events</h3>
              <p className="leading-relaxed text-[var(--muted-text)]">
                Professional Katering for business meetings, conferences, and corporate gatherings.
              </p>
            </div>
            <div className="ui-card p-10 text-center">
              <div className="ui-icon-circle mx-auto mb-6 h-20 w-20">
                <i className="fi fi-rr-balloons text-3xl text-[var(--baguette-dark)]"></i>
              </div>
              <h3 className="mb-4 text-2xl text-[var(--foreground)]">Private Parties</h3>
              <p className="leading-relaxed text-[var(--muted-text)]">
                Birthday parties, anniversaries, and special celebrations with personalized service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CurveDivider />

      <section className="bg-[var(--baguette-subtle)] py-20">
        <div className="mx-auto max-w-4xl px-8 text-center">
          <h2 className="mb-8 text-4xl text-[var(--foreground)]">About Kim&apos;s Katering</h2>
          <p className="mb-8 text-lg leading-relaxed text-[var(--muted-dark)]">
            Welcome to Kim&apos;s Katering, your friendly neighborhood bakery and Katering service! For the past 9 years, 
            Kim has been baking up love and delicious memories right here in Strathmore, Alberta at Bay #1 - 70 Slater Rd. 
            What started as a passion for homemade goodness has grown into a beloved local business that brings families together.
          </p>
          <p className="mb-8 text-lg leading-relaxed text-[var(--muted-dark)]">
            From intimate birthday celebrations to grand wedding receptions, Kim and her warm-hearted team have been 
            honored to be part of your most precious moments. Whether it&apos;s a cozy family reunion, a joyful fundraiser, 
            or a special home party, we believe every gathering deserves the comfort and joy that only homemade treats can bring.
          </p>
          <p className="mb-8 text-lg leading-relaxed text-[var(--muted-dark)]">
            Our kitchen is where magic happens! Every morning, Kim rolls up her sleeves and creates the most scrumptious 
            homemade pies, fresh-baked buns, delicate butter horns, and dreamy cakes using real cream and premium 
            Callebaut chocolate. It&apos;s not just food – it&apos;s love baked into every bite. Kim loves sitting down with you 
            to plan your special day, making sure every detail is just perfect for your guests.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h4 className="mb-2 text-2xl text-[var(--baguette-dark)]">9+</h4>
              <p className="text-[var(--muted-text)]">Years of Love & Baking</p>
            </div>
            <div>
              <h4 className="mb-2 text-2xl text-[var(--baguette-dark)]">Made with</h4>
              <p className="text-[var(--muted-text)]">Love & Real Ingredients</p>
            </div>
            <div>
              <h4 className="mb-2 text-2xl text-[var(--baguette-dark)]">Your</h4>
              <p className="text-[var(--muted-text)]">Neighborhood Baker</p>
            </div>
          </div>
        </div>
      </section>

      <CurveDivider flip />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="ui-cta-panel">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full border border-white/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full border border-white/10" aria-hidden="true" />
            <h2 className="mb-4 text-4xl text-white">Get In Touch</h2>
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/85">
              Ready to plan your next event? Contact us for a consultation and custom quote.
            </p>
            <a
              href="/contact"
              className="ui-btn-white"
              aria-label="Contact us for katering services"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}