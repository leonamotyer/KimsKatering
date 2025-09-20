import eventsData from "../data/events.json";
import VictorianBorder from "../componenets/victorian-animation";

export default function Events() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-light text-[var(--baguette-dark)] mb-8 tracking-tight">
            Events
          </h1>
          <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-8"></div>
          <p className="text-lg text-[var(--baguette-muted)] max-w-2xl mx-auto leading-relaxed">
            {eventsData.generalInfo.philosophy}
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {eventsData.events.map((event) => (
              <div key={event.id} className="group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg width="16" height="16" viewBox="0 0 16 16" className="text-stone-400 group-hover:text-stone-500 transition-colors">
                        {/* Outer diamond outline */}
                        <path d="M8 2 L14 8 L8 14 L2 8 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        {/* Inner diamond */}
                        <path d="M8 4 L12 8 L8 12 L4 8 Z" stroke="currentColor" strokeWidth="1" fill="none"/>
                        {/* Center dot */}
                        <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                        {/* Corner accents */}
                        <circle cx="8" cy="2" r="0.8" fill="currentColor"/>
                        <circle cx="14" cy="8" r="0.8" fill="currentColor"/>
                        <circle cx="8" cy="14" r="0.8" fill="currentColor"/>
                        <circle cx="2" cy="8" r="0.8" fill="currentColor"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light text-[var(--baguette-dark)] group-hover:text-[var(--baguette-dark)] transition-colors">
                      {event.name}
                    </h3>
                  </div>
                </div>
                
                <div className="ml-16 pl-8 border-l border-[var(--baguette-light)]">
                  <p className="text-[var(--baguette-muted)] leading-relaxed mb-6">
                    {event.description}
                  </p>
                  
                  {event.customization && (
                    <div className="mb-4">
                      <p className="text-sm text-[var(--baguette-muted)] font-medium mb-1">Customization</p>
                      <p className="text-sm text-[var(--baguette-muted)]">{event.customization}</p>
                    </div>
                  )}
                  
                  
                  {event.specialPricing && (
                    <div className="mb-4">
                      <p className="text-sm text-[var(--baguette-muted)] font-medium mb-1">Special Pricing</p>
                      <p className="text-sm text-[var(--baguette-muted)]">{event.specialPricing}</p>
                    </div>
                  )}
                  
                  {event.capacity && (
                    <div className="mb-4">
                      <p className="text-sm text-[var(--baguette-muted)] font-medium mb-1">Capacity</p>
                      <p className="text-sm text-[var(--baguette-muted)]">{event.capacity}</p>
                    </div>
                  )}
                  
                  {event.pricing && (
                    <div className="mb-4">
                      <p className="text-sm text-[var(--baguette-muted)] font-medium mb-1">Pricing</p>
                      <p className="text-sm text-[var(--baguette-muted)]">{event.pricing}</p>
                    </div>
                  )}

                  {event.specialServices && (
                    <div className="mb-4">
                      <p className="text-sm text-[var(--baguette-muted)] font-medium mb-2">Special Services</p>
                      <ul className="text-sm text-[var(--baguette-muted)] space-y-1">
                        {event.specialServices.map((service, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-[var(--baguette-light)] mr-2">•</span>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {event.menus && (
                    <div className="mb-4">
                      <p className="text-sm text-[var(--baguette-muted)] font-medium mb-3">Menu Options</p>
                      <div className="space-y-3">
                        {event.menus.map((menu, idx) => (
                          <div key={idx} className="border border-[var(--baguette-light)] rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-sm font-medium text-[var(--baguette-dark)]">{menu.name}</h4>
                              <span className="text-sm font-medium text-[var(--baguette-muted)]">{menu.price}</span>
                            </div>
                            <p className="text-sm text-[var(--baguette-muted)]">{menu.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--baguette-light)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-[var(--baguette-dark)] mb-8">
            Ready to Plan Your Event?
          </h2>
          <p className="text-lg text-[var(--baguette-muted)] mb-12 max-w-2xl mx-auto">
            {eventsData.generalInfo.customization}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="tel:403-497-9338" 
              className="bg-[var(--baguette-dark)] text-white px-8 py-4 text-sm font-medium hover:bg-[var(--baguette-medium)] transition-colors tracking-wide uppercase"
            >
              Call Kim: 403-497-9338
            </a>
            <a 
              href="/menu" 
              className="border border-[var(--baguette-light)] text-[var(--baguette-dark)] px-8 py-4 text-sm font-medium hover:bg-[var(--baguette-subtle)] transition-colors tracking-wide uppercase"
            >
              View Menu
            </a>
          </div>
        </div>
      </section>

      {/* Victorian Page Border */}
      <VictorianBorder />
    </div>
  );
}
