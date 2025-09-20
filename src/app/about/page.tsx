import Image from "next/image";
import VictorianBorder from "../../componenets/victorian-animation";

export default function About() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--baguette-dark)] mb-6">
            About Kim&apos;s Catering
          </h1>
          <p className="text-xl text-[var(--baguette-muted)] max-w-2xl mx-auto">
            Your friendly neighborhood bakery and catering service in Strathmore, Alberta
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Image */}
            <div className="order-2 lg:order-1">
              <Image
                src="/bread.jpg"
                alt="Kim's Kitchen - Fresh Baking"
                width={500}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Right Column - Story */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-[var(--baguette-dark)] mb-6">
                Our Story
              </h2>
              <p className="text-lg text-[var(--baguette-muted)] leading-relaxed mb-6">
                For the past 9 years, Kim has been baking up love and delicious memories 
                right here in Strathmore, Alberta at Bay #1 - 70 Slater Rd. What started 
                as a passion for homemade goodness has grown into a beloved local business 
                that brings families together.
              </p>
              <p className="text-lg text-[var(--baguette-muted)] leading-relaxed">
                Every morning, Kim rolls up her sleeves and creates the most scrumptious 
                homemade pies, fresh-baked buns, delicate butter horns, and dreamy cakes 
                using real cream and premium Callebaut chocolate. It&apos;s not just food – 
                it&apos;s love baked into every bite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-[var(--baguette-subtle)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--baguette-dark)] mb-4">
              Events We Love to Cater
            </h2>
            <p className="text-lg text-[var(--baguette-muted)]">
              From intimate gatherings to grand celebrations, we&apos;re honored to be part of your special moments
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                <i className="fi fi-rr-ring text-2xl text-[var(--baguette-muted)]"></i>
              </div>
              <p className="text-sm font-medium text-[var(--baguette-dark)]">Weddings</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                <i className="fi fi-rr-balloons text-2xl text-[var(--baguette-muted)]"></i>
              </div>
              <p className="text-sm font-medium text-[var(--baguette-dark)]">Birthdays</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                <i className="fi fi-rr-building text-2xl text-[var(--baguette-muted)]"></i>
              </div>
              <p className="text-sm font-medium text-[var(--baguette-dark)]">Corporate</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                <i className="fi fi-rr-home text-2xl text-[var(--baguette-muted)]"></i>
              </div>
              <p className="text-sm font-medium text-[var(--baguette-dark)]">Home Parties</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--baguette-dark)] mb-4">
              Our Specialties
            </h2>
            <p className="text-lg text-[var(--baguette-muted)]">
              Handcrafted with love using the finest ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[var(--baguette-subtle)] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[var(--baguette-dark)] mb-3">Homemade Baking</h3>
              <ul className="space-y-2 text-[var(--baguette-muted)]">
                <li>• Fresh-baked pies</li>
                <li>• Warm butter horns</li>
                <li>• Soft dinner buns</li>
                <li>• Artisan breads</li>
              </ul>
            </div>
            <div className="bg-[var(--baguette-subtle)] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[var(--baguette-dark)] mb-3">Custom Cakes</h3>
              <ul className="space-y-2 text-[var(--baguette-muted)]">
                <li>• Wedding cakes</li>
                <li>• Birthday celebrations</li>
                <li>• Specialty desserts</li>
                <li>• Made with Callebaut chocolate</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[var(--baguette-subtle)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--baguette-dark)] mb-4">
            Let&apos;s Plan Your Special Event
          </h2>
          <p className="text-lg text-[var(--baguette-muted)] mb-8">
            Kim loves sitting down with you to plan your special day, making sure every detail is just perfect for your guests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[var(--baguette-dark)] text-white px-8 py-4 text-lg font-semibold hover:bg-[var(--baguette-medium)] transition-colors rounded-lg">
              Contact Kim
            </button>
            <button className="border-2 border-[var(--baguette-dark)] text-[var(--baguette-dark)] px-8 py-4 text-lg font-semibold hover:bg-[var(--baguette-dark)] hover:text-white transition-colors rounded-lg">
              View Menu
            </button>
          </div>
        </div>
      </section>

      {/* Victorian Page Border */}
      <VictorianBorder />
    </div>
  );
}
