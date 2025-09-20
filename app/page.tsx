import Image from "next/image";
import VictorianBorder from "./componenets/victorian-animation";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Full Screen Hero Image */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/bread.jpg"
          alt="Fresh Artisan Bread"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Centered Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              Kim&apos;s katering
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Professional katering services for your special events
            </p>
            <button className="bg-white text-[var(--baguette-dark)] px-8 py-4 text-lg font-semibold hover:bg-[var(--baguette-subtle)] transition-colors">
              View Menu
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Scrollable Content Below */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Service 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[var(--baguette-subtle)] rounded-full mx-auto mb-6 flex items-center justify-center">
                <i className="fi fi-rr-ring text-3xl text-[var(--baguette-muted)]"></i>
              </div>
              <h3 className="text-2xl font-bold text-[var(--baguette-dark)] mb-4">Wedding katering</h3>
              <p className="text-[var(--baguette-muted)] leading-relaxed">
                Elegant and delicious meals for your special day. Custom menus tailored to your preferences.
              </p>
            </div>

            {/* Service 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[var(--baguette-subtle)] rounded-full mx-auto mb-6 flex items-center justify-center">
                <i className="fi fi-rr-building text-3xl text-[var(--baguette-muted)]"></i>
              </div>
              <h3 className="text-2xl font-bold text-[var(--baguette-dark)] mb-4">Corporate Events</h3>
              <p className="text-[var(--baguette-muted)] leading-relaxed">
                Professional katering for business meetings, conferences, and corporate gatherings.
              </p>
            </div>

            {/* Service 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[var(--baguette-subtle)] rounded-full mx-auto mb-6 flex items-center justify-center">
                <i className="fi fi-rr-balloons text-3xl text-[var(--baguette-muted)]"></i>
              </div>
              <h3 className="text-2xl font-bold text-[var(--baguette-dark)] mb-4">Private Parties</h3>
              <p className="text-[var(--baguette-muted)] leading-relaxed">
                Birthday parties, anniversaries, and special celebrations with personalized service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-[var(--baguette-subtle)]">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-[var(--baguette-dark)] mb-8">About Kim&apos;s katering</h2>
          <p className="text-lg text-[var(--baguette-muted)] leading-relaxed mb-8">
            Welcome to Kim&apos;s katering, your friendly neighborhood bakery and katering service! For the past 9 years, 
            Kim has been baking up love and delicious memories right here in Strathmore, Alberta at Bay #1 - 70 Slater Rd. 
            What started as a passion for homemade goodness has grown into a beloved local business that brings families together.
          </p>
          <p className="text-lg text-[var(--baguette-muted)] leading-relaxed mb-8">
            From intimate birthday celebrations to grand wedding receptions, Kim and her warm-hearted team have been 
            honored to be part of your most precious moments. Whether it&apos;s a cozy family reunion, a joyful fundraiser, 
            or a special home party, we believe every gathering deserves the comfort and joy that only homemade treats can bring.
          </p>
          <p className="text-lg text-[var(--baguette-muted)] leading-relaxed mb-8">
            Our kitchen is where magic happens! Every morning, Kim rolls up her sleeves and creates the most scrumptious 
            homemade pies, fresh-baked buns, delicate butter horns, and dreamy cakes using real cream and premium 
            Callebaut chocolate. It&apos;s not just food – it&apos;s love baked into every bite. Kim loves sitting down with you 
            to plan your special day, making sure every detail is just perfect for your guests.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <h4 className="text-2xl font-bold text-[var(--baguette-dark)] mb-2">9+</h4>
              <p className="text-[var(--baguette-muted)]">Years of Love & Baking</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-[var(--baguette-dark)] mb-2">Made with</h4>
              <p className="text-[var(--baguette-muted)]">Love & Real Ingredients</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-[var(--baguette-dark)] mb-2">Your</h4>
              <p className="text-[var(--baguette-muted)]">Neighborhood Baker</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-[var(--baguette-dark)] mb-8">Get In Touch</h2>
          <p className="text-lg text-[var(--baguette-muted)] mb-8">
            Ready to plan your next event? Contact us for a consultation and custom quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[var(--baguette-dark)] text-white px-8 py-4 text-lg font-semibold hover:bg-[var(--baguette-medium)] transition-colors">
              Contact Us
            </button>
            <button className="border-2 border-[var(--baguette-dark)] text-[var(--baguette-dark)] px-8 py-4 text-lg font-semibold hover:bg-[var(--baguette-dark)] hover:text-white transition-colors">
              View Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Victorian Page Border */}
      <VictorianBorder />
    </div>
  );
}