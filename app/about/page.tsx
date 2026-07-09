import Image from "next/image";
import CurveDivider from "../componenets/curve-divider";

export default function About() {
  return (
    <div className="page-shell">
      <section className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl text-[var(--foreground)] md:text-6xl">
            About Kim&apos;s Katering
          </h1>
          <div className="ui-divider" aria-hidden="true"><span /></div>
          <p className="mx-auto max-w-2xl text-xl text-[var(--muted-text)]">
            Your friendly neighborhood bakery and Katering service in Strathmore, Alberta
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-t-full rounded-b-2xl border-8 border-white shadow-[0_16px_50px_rgba(107,93,79,0.18)]">
                <Image
                  src="/bread.jpg"
                  alt="Kim's Kitchen - Fresh Baking"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-6 text-3xl text-[var(--foreground)]">
                Our Story
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-[var(--muted-dark)]">
                For the past 9 years, Kim has been baking up love and delicious memories 
                right here in Strathmore, Alberta at Bay #1 - 70 Slater Rd. What started 
                as a passion for homemade goodness has grown into a beloved local business 
                that brings families together.
              </p>
              <p className="text-lg leading-relaxed text-[var(--muted-dark)]">
                Every morning, Kim rolls up her sleeves and creates the most scrumptious 
                homemade pies, fresh-baked buns, delicate butter horns, and dreamy cakes 
                using real cream and premium Callebaut chocolate. It&apos;s not just food – 
                it&apos;s love baked into every bite.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CurveDivider />

      <section className="bg-[var(--baguette-subtle)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl text-[var(--foreground)]">
              Events We Love to Cater
            </h2>
            <p className="text-lg text-[var(--muted-text)]">
              From intimate gatherings to grand celebrations, we&apos;re honored to be part of your special moments
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="group text-center">
              <div className="ui-icon-circle mx-auto mb-4 h-20 w-20 bg-white shadow-[0_8px_30px_rgba(107,93,79,0.1)] group-hover:-translate-y-1">
                <i className="fi fi-rr-ring text-2xl text-[var(--baguette-dark)]"></i>
              </div>
              <p className="text-sm font-medium text-[var(--baguette-dark)]">Weddings</p>
            </div>
            <div className="group text-center">
              <div className="ui-icon-circle mx-auto mb-4 h-20 w-20 bg-white shadow-[0_8px_30px_rgba(107,93,79,0.1)] group-hover:-translate-y-1">
                <i className="fi fi-rr-balloons text-2xl text-[var(--baguette-dark)]"></i>
              </div>
              <p className="text-sm font-medium text-[var(--baguette-dark)]">Birthdays</p>
            </div>
            <div className="group text-center">
              <div className="ui-icon-circle mx-auto mb-4 h-20 w-20 bg-white shadow-[0_8px_30px_rgba(107,93,79,0.1)] group-hover:-translate-y-1">
                <i className="fi fi-rr-building text-2xl text-[var(--baguette-dark)]"></i>
              </div>
              <p className="text-sm font-medium text-[var(--baguette-dark)]">Corporate</p>
            </div>
            <div className="group text-center">
              <div className="ui-icon-circle mx-auto mb-4 h-20 w-20 bg-white shadow-[0_8px_30px_rgba(107,93,79,0.1)] group-hover:-translate-y-1">
                <i className="fi fi-rr-home text-2xl text-[var(--baguette-dark)]"></i>
              </div>
              <p className="text-sm font-medium text-[var(--baguette-dark)]">Home Parties</p>
            </div>
          </div>
        </div>
      </section>

      <CurveDivider flip />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl text-[var(--foreground)]">
              Our Specialties
            </h2>
            <p className="text-lg text-[var(--muted-text)]">
              Handcrafted with love using the finest ingredients
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="ui-card p-8">
              <h3 className="mb-3 text-xl font-semibold text-[var(--foreground)]">Homemade Baking</h3>
              <ul className="space-y-2 text-[var(--muted-dark)]">
                <li>• Fresh-baked pies</li>
                <li>• Warm butter horns</li>
                <li>• Soft dinner buns</li>
                <li>• Artisan breads</li>
              </ul>
            </div>
            <div className="ui-card p-8">
              <h3 className="mb-3 text-xl font-semibold text-[var(--foreground)]">Custom Cakes</h3>
              <ul className="space-y-2 text-[var(--muted-dark)]">
                <li>• Wedding cakes</li>
                <li>• Birthday celebrations</li>
                <li>• Specialty desserts</li>
                <li>• Made with Callebaut chocolate</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="ui-cta-panel">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full border border-white/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full border border-white/10" aria-hidden="true" />
            <h2 className="mb-4 text-3xl text-white">
              Let&apos;s Plan Your Special Event
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/85">
              Kim loves sitting down with you to plan your special day, making sure every detail is just perfect for your guests.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a href="/contact" className="ui-btn-white">
                Contact Kim
              </a>
              <a href="/menu" className="ui-btn-outline-white">
                View Menu
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
