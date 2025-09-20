export default function VictorianBorder() {
  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 bg-stone-50">
      {/* Modern Victorian Ornamental Divider */}
      <div className="max-w-6xl mx-auto">
        <svg 
          width="100%" 
          height="80" 
          viewBox="0 0 800 80" 
          className="text-stone-400"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Central ornamental motif */}
          <g transform="translate(400,40)">
            {/* Main central element - stylized fleur-de-lis */}
            <path 
              d="M0,20 Q-8,15 -12,8 Q-8,2 -4,0 Q0,-2 4,0 Q8,2 12,8 Q8,15 0,20" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              fill="none"
            />
            {/* Central dot */}
            <circle cx="0" cy="0" r="2" fill="currentColor" />
            {/* Side scrolls */}
            <path 
              d="M-12,8 Q-18,5 -20,0 Q-18,-5 -12,-8" 
              stroke="currentColor" 
              strokeWidth="1" 
              fill="none"
            />
            <path 
              d="M12,8 Q18,5 20,0 Q18,-5 12,-8" 
              stroke="currentColor" 
              strokeWidth="1" 
              fill="none"
            />
          </g>
          
          {/* Left horizontal extension */}
          <path 
            d="M50,40 Q120,35 180,40 Q240,45 300,40 Q360,35 400,40" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            fill="none"
          />
          
          {/* Right horizontal extension */}
          <path 
            d="M400,40 Q440,35 500,40 Q560,45 620,40 Q680,35 750,40" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            fill="none"
          />
          
          {/* Decorative dots along left extension */}
          <circle cx="100" cy="40" r="2" fill="currentColor" opacity="0.8" />
          <circle cx="150" cy="40" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="200" cy="40" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="250" cy="40" r="1" fill="currentColor" opacity="0.6" />
          <circle cx="300" cy="40" r="1" fill="currentColor" opacity="0.6" />
          <circle cx="350" cy="40" r="0.8" fill="currentColor" opacity="0.5" />
          
          {/* Decorative dots along right extension */}
          <circle cx="450" cy="40" r="0.8" fill="currentColor" opacity="0.5" />
          <circle cx="500" cy="40" r="1" fill="currentColor" opacity="0.6" />
          <circle cx="550" cy="40" r="1" fill="currentColor" opacity="0.6" />
          <circle cx="600" cy="40" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="650" cy="40" r="1.5" fill="currentColor" opacity="0.7" />
          <circle cx="700" cy="40" r="2" fill="currentColor" opacity="0.8" />
          
          {/* End flourishes - stylized leaves */}
          <g transform="translate(50,40)">
            <path 
              d="M0,0 Q-6,-4 -8,-8 Q-6,-12 -2,-10 Q2,-8 6,-4 Q4,-2 0,0" 
              stroke="currentColor" 
              strokeWidth="1" 
              fill="none"
            />
            <path 
              d="M0,0 Q6,-4 8,-8 Q6,-12 2,-10 Q-2,-8 -6,-4 Q-4,-2 0,0" 
              stroke="currentColor" 
              strokeWidth="1" 
              fill="none"
            />
          </g>
          
          <g transform="translate(750,40)">
            <path 
              d="M0,0 Q6,-4 8,-8 Q6,-12 2,-10 Q-2,-8 -6,-4 Q-4,-2 0,0" 
              stroke="currentColor" 
              strokeWidth="1" 
              fill="none"
            />
            <path 
              d="M0,0 Q-6,-4 -8,-8 Q-6,-12 -2,-10 Q2,-8 6,-4 Q4,-2 0,0" 
              stroke="currentColor" 
              strokeWidth="1" 
              fill="none"
            />
          </g>
          
          {/* Subtle accent lines */}
          <path 
            d="M100,40 Q150,38 200,40" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            fill="none" 
            opacity="0.4"
          />
          <path 
            d="M600,40 Q650,38 700,40" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            fill="none" 
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}
