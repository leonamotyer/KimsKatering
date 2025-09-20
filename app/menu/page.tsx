import menuData from "../data/menu.json";
import VictorianBorder from "../componenets/victorian-animation";

export default function Menu() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-light text-[var(--baguette-dark)] mb-8 tracking-tight">
            Menu
          </h1>
          <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-8"></div>
          <p className="text-lg text-[var(--baguette-muted)] max-w-2xl mx-auto leading-relaxed">
            Fresh, homemade goodness crafted with love
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-20">
            {menuData.menuCategories.map((category) => (
              <div key={category.id} className="group">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 20 20" className="text-stone-400 group-hover:text-stone-500 transition-colors">
                      {/* Outer diamond outline */}
                      <path d="M10 2 L18 10 L10 18 L2 10 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      {/* Inner diamond */}
                      <path d="M10 4 L16 10 L10 16 L4 10 Z" stroke="currentColor" strokeWidth="1" fill="none"/>
                      {/* Center dot */}
                      <circle cx="10" cy="10" r="2" fill="currentColor"/>
                      {/* Corner accents */}
                      <circle cx="10" cy="2" r="1" fill="currentColor"/>
                      <circle cx="18" cy="10" r="1" fill="currentColor"/>
                      <circle cx="10" cy="18" r="1" fill="currentColor"/>
                      <circle cx="2" cy="10" r="1" fill="currentColor"/>
                      {/* Decorative lines */}
                      <path d="M10 2 L10 4" stroke="currentColor" strokeWidth="0.8"/>
                      <path d="M18 10 L16 10" stroke="currentColor" strokeWidth="0.8"/>
                      <path d="M10 18 L10 16" stroke="currentColor" strokeWidth="0.8"/>
                      <path d="M2 10 L4 10" stroke="currentColor" strokeWidth="0.8"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-light text-[var(--baguette-dark)] group-hover:text-[var(--baguette-dark)] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-[var(--baguette-muted)] mt-2">{category.description}</p>
                  </div>
                </div>

                {category.pricingNote && (
                  <div className="ml-16 pl-8 border-l border-[var(--baguette-light)] mb-8">
                    <div className="bg-[var(--baguette-subtle)] rounded-lg p-4">
                      <p className="text-sm text-[var(--baguette-muted)] italic">{category.pricingNote}</p>
                    </div>
                  </div>
                )}

                <div className="ml-16 pl-8 border-l border-[var(--baguette-light)]">
                  <div className="space-y-6">
                    {category.items.map((item, index) => (
                      <div key={index} className="group/item">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-medium text-[var(--baguette-dark)] group-hover/item:text-[var(--baguette-dark)] transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-sm font-medium text-[var(--baguette-muted)] ml-4 flex-shrink-0">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-[var(--baguette-muted)] text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {category.addOns && category.addOns.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-[var(--baguette-subtle)]">
                      <h5 className="text-sm font-medium text-[var(--baguette-muted)] mb-4 uppercase tracking-wide">Add-ons</h5>
                      <div className="space-y-4">
                        {category.addOns.map((addon, index) => (
                          <div key={index} className="flex justify-between items-start">
                            <div>
                              <h6 className="text-sm font-medium text-[var(--baguette-dark)]">{addon.name}</h6>
                              <p className="text-xs text-[var(--baguette-muted)]">{addon.description}</p>
                            </div>
                            <span className="text-xs font-medium text-[var(--baguette-muted)] ml-4 flex-shrink-0">
                              {addon.price}
                            </span>
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
            Custom Menu Planning
          </h2>
          <p className="text-lg text-[var(--baguette-muted)] mb-12 max-w-2xl mx-auto">
            Kim is available to customize your menu for any special occasion. 
            Select from any of our menu items or call us for personalized meal planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="tel:403-497-9338" 
              className="bg-[var(--baguette-dark)] text-white px-8 py-4 text-sm font-medium hover:bg-[var(--baguette-medium)] transition-colors tracking-wide uppercase"
            >
              Call Kim: 403-497-9338
            </a>
            <a 
              href="/events" 
              className="border border-[var(--baguette-light)] text-[var(--baguette-dark)] px-8 py-4 text-sm font-medium hover:bg-[var(--baguette-subtle)] transition-colors tracking-wide uppercase"
            >
              View Events
            </a>
          </div>
        </div>
      </section>

      {/* Victorian Page Border */}
      <VictorianBorder />
    </div>
  );
}
