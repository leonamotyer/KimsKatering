export default function CurveDivider({
  flip = false,
  fill = "var(--baguette-subtle)",
}: {
  flip?: boolean;
  fill?: string;
}) {
  return (
    <div className={flip ? "rotate-180" : ""} aria-hidden="true">
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="block h-12 w-full md:h-16"
      >
        <path d="M0,64 C360,0 1080,0 1440,64 L1440,64 L0,64 Z" fill={fill} />
      </svg>
    </div>
  );
}
