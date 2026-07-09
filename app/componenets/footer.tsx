import Link from "next/link";
import Image from "next/image";
import { ObfuscatedContactEmail } from "./obfuscated-contact-email";

function Grain({
  x,
  y,
  rot,
  opacity = 0.7,
  awn = false,
}: {
  x: number;
  y: number;
  rot: number;
  opacity?: number;
  awn?: boolean;
}) {
  const rad = (rot * Math.PI) / 180;
  const tipX = x + Math.cos(rad) * 3.2;
  const tipY = y + Math.sin(rad) * 3.2;

  return (
    <g>
      <ellipse
        cx={x}
        cy={y}
        rx="2.6"
        ry="0.85"
        transform={`rotate(${rot} ${x} ${y})`}
        fill="currentColor"
        opacity={opacity}
      />
      {awn && (
        <path
          d={`M${tipX},${tipY} L${tipX + Math.cos(rad) * 2.5},${tipY + Math.sin(rad) * 2.5}`}
          stroke="currentColor"
          strokeWidth="0.45"
          fill="none"
          opacity={opacity * 0.7}
        />
      )}
    </g>
  );
}

function Kernel({
  x,
  y,
  rot,
  len,
  opacity,
  awnLen = 0,
}: {
  x: number;
  y: number;
  rot: number;
  len: number;
  opacity: number;
  awnLen?: number;
}) {
  const w = len * 0.42;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <path
        d={`M0,0 C${w},${-len * 0.3} ${w * 0.85},${-len * 0.78} 0,${-len} C${-w * 0.85},${-len * 0.78} ${-w},${-len * 0.3} 0,0 Z`}
        fill="currentColor"
        opacity={opacity}
      />
      {awnLen > 0 && (
        <path
          d={`M0,${-len} Q${awnLen * 0.18},${-len - awnLen * 0.55} ${awnLen * 0.32},${-len - awnLen}`}
          stroke="currentColor"
          strokeWidth="0.45"
          fill="none"
          opacity={opacity * 0.55}
        />
      )}
    </g>
  );
}

function WheatEar({
  earLen,
  kLen,
  opacity,
}: {
  earLen: number;
  kLen: number;
  opacity: number;
}) {
  const step = kLen * 0.48;
  const n = Math.round(earLen / step);
  const tipY = -n * step;

  return (
    <g>
      <path
        d={`M0,0 L0,${-earLen - kLen * 0.4}`}
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity={opacity * 0.5}
      />
      {Array.from({ length: n }, (_, i) => {
        const y = -i * step;
        const t = i / (n - 1);
        const size = kLen * (1 - t * 0.28);
        const fade = opacity * (0.82 + t * 0.18);
        const awn = kLen * (1.0 + t * 1.3);
        return (
          <g key={i}>
            <Kernel x={0} y={y} rot={-26} len={size} opacity={fade * 0.92} awnLen={awn} />
            <Kernel x={0} y={y - step * 0.5} rot={26} len={size} opacity={fade} awnLen={awn} />
          </g>
        );
      })}
      <Kernel x={0} y={tipY} rot={0} len={kLen * 0.7} opacity={opacity} awnLen={kLen * 2.4} />
    </g>
  );
}

function WheatStalk({
  bend,
  stemLen,
  earLen,
  kLen,
  opacity,
}: {
  bend: number;
  stemLen: number;
  earLen: number;
  kLen: number;
  opacity: number;
}) {
  const endAngle = Math.atan2(bend * 1.35, stemLen) * (180 / Math.PI);
  return (
    <g>
      <path
        d={`M0,0 Q${bend * 0.25},${-stemLen * 0.6} ${bend},${-stemLen}`}
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity={opacity * 0.6}
      />
      <g transform={`translate(${bend},${-stemLen}) rotate(${endAngle})`}>
        <WheatEar earLen={earLen} kLen={kLen} opacity={opacity} />
      </g>
    </g>
  );
}

function TwineBow() {
  return (
    <g>
      <path
        d="M-6,-2.5 Q0,-4.2 6,-2.5 M-6.3,-0.5 Q0,-2.2 6.3,-0.5 M-6,1.5 Q0,-0.2 6,1.5"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M0,0 Q-8,-6.5 -10,-1.5 Q-11,2.5 -4.5,1.5 Q-1.5,1 0,0"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M0,0 Q8,-6.5 10,-1.5 Q11,2.5 4.5,1.5 Q1.5,1 0,0"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.8"
      />
      <circle cx="0" cy="0" r="1.6" fill="currentColor" opacity="0.75" />
      <path d="M-0.5,1 Q-3,6 -5.5,9.5" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.65" />
      <path d="M0.8,1 Q2.5,5.5 3.5,10" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.65" />
    </g>
  );
}

function WheatSheaf() {
  const stalks = [
    { bend: -26, stemLen: 30, earLen: 15, kLen: 4.2, opacity: 0.62 },
    { bend: -17, stemLen: 34, earLen: 17, kLen: 4.5, opacity: 0.72 },
    { bend: -9, stemLen: 37, earLen: 19, kLen: 4.8, opacity: 0.82 },
    { bend: -2, stemLen: 39, earLen: 20, kLen: 5.0, opacity: 0.92 },
    { bend: 5, stemLen: 38, earLen: 19, kLen: 4.9, opacity: 0.88 },
    { bend: 13, stemLen: 35, earLen: 18, kLen: 4.6, opacity: 0.78 },
    { bend: 22, stemLen: 31, earLen: 16, kLen: 4.3, opacity: 0.66 },
  ];
  const cutStems = [-7, -4.5, -2, 0.5, 3, 5.5, 8];

  return (
    <g>
      {cutStems.map((bx, i) => (
        <path
          key={i}
          d={`M${bx * 0.25},0 Q${bx * 0.6},9 ${bx},17`}
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
      ))}
      {stalks.map((stalk, i) => (
        <WheatStalk key={i} {...stalk} />
      ))}
      <TwineBow />
    </g>
  );
}

function StalkPath({
  d,
  grains,
  strokeOpacity = 1,
}: {
  d: string;
  grains: { x: number; y: number; rot: number; opacity?: number; awn?: boolean }[];
  strokeOpacity?: number;
}) {
  return (
    <g>
      <path d={d} stroke="currentColor" strokeWidth="0.7" fill="none" opacity={strokeOpacity} />
      {grains.map((grain, i) => (
        <Grain key={i} {...grain} />
      ))}
    </g>
  );
}

function EndSeeds({ side }: { side: "left" | "right" }) {
  const dir = side === "left" ? -1 : 1;

  const seeds = [
    { dx: 5 * dir, dy: -12, rot: -65 * dir, opacity: 0.88, awn: true },
    { dx: 10 * dir, dy: -7, rot: -40 * dir, opacity: 0.84, awn: true },
    { dx: 14 * dir, dy: -2, rot: -18 * dir, opacity: 0.9, awn: true },
    { dx: 16 * dir, dy: 0, rot: 0, opacity: 0.95, awn: true },
    { dx: 14 * dir, dy: 2, rot: 18 * dir, opacity: 0.9, awn: true },
    { dx: 10 * dir, dy: 7, rot: 40 * dir, opacity: 0.84, awn: true },
    { dx: 5 * dir, dy: 12, rot: 65 * dir, opacity: 0.8, awn: true },
    { dx: 12 * dir, dy: -9, rot: -50 * dir, opacity: 0.78 },
    { dx: 12 * dir, dy: 9, rot: 50 * dir, opacity: 0.75 },
    { dx: 17 * dir, dy: -4, rot: -22 * dir, opacity: 0.82 },
    { dx: 17 * dir, dy: 4, rot: 22 * dir, opacity: 0.8 },
  ];

  return (
    <g>
      {seeds.map((seed, i) => (
        <Grain key={i} x={seed.dx} y={seed.dy} rot={seed.rot} opacity={seed.opacity} awn={seed.awn} />
      ))}
      <path
        d={`M0,0 L${14 * dir},-10 M0,0 L${18 * dir},0 M0,0 L${14 * dir},10`}
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.4"
      />
    </g>
  );
}

function OrnamentDivider() {
  const upperStalk =
    "M 58,44 Q 115,36 168,48 Q 221,56 274,40 Q 327,32 380,50 Q 400,54 420,50 Q 473,32 526,48 Q 579,56 632,40 Q 685,32 742,44";
  const lowerStalk =
    "M 58,46 Q 115,54 168,42 Q 221,34 274,50 Q 327,58 380,40 Q 400,36 420,40 Q 473,58 526,42 Q 579,34 632,50 Q 685,58 742,46";

  const upperGrains = [
    { x: 108, y: 39, rot: 36, opacity: 0.65 },
    { x: 168, y: 49, rot: -38, opacity: 0.7, awn: true },
    { x: 258, y: 39, rot: -38, opacity: 0.74, awn: true },
    { x: 318, y: 34, rot: 36, opacity: 0.76 },
    { x: 348, y: 51, rot: -38, opacity: 0.78, awn: true },
    { x: 458, y: 51, rot: 36, opacity: 0.78 },
    { x: 518, y: 36, rot: -38, opacity: 0.72, awn: true },
    { x: 608, y: 53, rot: 36, opacity: 0.7 },
    { x: 668, y: 35, rot: -38, opacity: 0.68, awn: true },
    { x: 728, y: 43, rot: 36, opacity: 0.62 },
  ];

  const lowerGrains = [
    { x: 93, y: 52, rot: 38, opacity: 0.58 },
    { x: 183, y: 35, rot: -36, opacity: 0.66, awn: true },
    { x: 273, y: 54, rot: 38, opacity: 0.68 },
    { x: 333, y: 57, rot: -36, opacity: 0.64, awn: true },
    { x: 363, y: 39, rot: 38, opacity: 0.72 },
    { x: 453, y: 39, rot: -36, opacity: 0.72, awn: true },
    { x: 513, y: 40, rot: 38, opacity: 0.66 },
    { x: 603, y: 50, rot: -36, opacity: 0.68, awn: true },
    { x: 693, y: 57, rot: 38, opacity: 0.6 },
    { x: 723, y: 52, rot: -36, opacity: 0.58 },
  ];

  return (
    <div className="px-6 pb-8 pt-10" aria-hidden="true">
      <svg
        width="100%"
        height="140"
        viewBox="0 -50 800 140"
        className="mx-auto max-w-4xl text-[var(--baguette-medium)]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Intertwined horizontal wheat stalks */}
        <StalkPath d={lowerStalk} grains={lowerGrains} strokeOpacity={0.75} />
        <StalkPath d={upperStalk} grains={upperGrains} />

        {/* Cross-over accents where stalks weave */}
        <circle cx="168" cy="45" r="1.2" fill="currentColor" opacity="0.35" />
        <circle cx="274" cy="45" r="1.2" fill="currentColor" opacity="0.35" />
        <circle cx="380" cy="45" r="1.5" fill="currentColor" opacity="0.45" />
        <circle cx="526" cy="45" r="1.2" fill="currentColor" opacity="0.35" />
        <circle cx="632" cy="45" r="1.2" fill="currentColor" opacity="0.35" />

        {/* End seeds poking out */}
        <g transform="translate(42, 45)">
          <EndSeeds side="left" />
        </g>
        <g transform="translate(758, 45)">
          <EndSeeds side="right" />
        </g>

        {/* Center wheat sheaf — vertical bunch tied with twine bow */}
        <g transform="translate(400,60) scale(0.85)">
          <WheatSheaf />
        </g>
      </svg>
    </div>
  );
}

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Menu", href: "/menu" },
  { name: "Services", href: "/events" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--muted-warm)]">
      <OrnamentDivider />
      <div className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:text-left">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/logo.png" alt="Kim's Katering Logo" width={44} height={44} className="h-11 w-auto" />
              <span className="font-serif text-2xl text-[var(--foreground)]">Kim&apos;s Katering</span>
            </Link>
          </div>
          <div className="md:justify-self-center">
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[var(--muted-dark)] transition-colors hover:text-[var(--baguette-dark)]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:justify-self-end">
            <p className="text-sm leading-relaxed text-[var(--muted-dark)]">
              Bay #1 - 70 Slater Rd
              <br />
              Strathmore, Alberta
            </p>
            <a href="tel:403-497-9338" className="mt-3 inline-block text-sm font-medium text-[var(--baguette-dark)] transition-colors hover:text-[var(--baguette-medium)]">
              403-497-9338
            </a>
            <div className="mt-1 text-sm">
              <ObfuscatedContactEmail
                iconWrapperClassName="hidden"
                textLinkClassName="text-sm text-[var(--muted-dark)] transition-colors hover:text-[var(--baguette-dark)]"
                icon={null}
                betweenIconAndAddress={null}
              />
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-[var(--muted-medium)] pt-6 text-center">
          <p className="text-xs tracking-wide text-[var(--muted-text)]">
            &copy; {new Date().getFullYear()} Kim&apos;s Katering
          </p>
        </div>
      </div>
    </footer>
  );
}
