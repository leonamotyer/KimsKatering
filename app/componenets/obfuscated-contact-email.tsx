"use client";

import { useEffect, useState, type ReactNode } from "react";
import { decodeContactEmail } from "../../lib/contact-email-public";

const FALLBACK_LABEL = "info (at) kimskatering (dot) ca";

type ObfuscatedContactEmailProps = {
  iconWrapperClassName: string;
  textLinkClassName: string;
  icon: ReactNode;
  betweenIconAndAddress: ReactNode;
};

export function ObfuscatedContactEmail({
  iconWrapperClassName,
  textLinkClassName,
  icon,
  betweenIconAndAddress,
}: ObfuscatedContactEmailProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const decoded = decodeContactEmail();
    if (decoded) setEmail(decoded);
  }, []);

  return (
    <>
      {email ? (
        <a
          href={`mailto:${email}`}
          className={iconWrapperClassName}
          aria-label={`Email ${email}`}
        >
          {icon}
        </a>
      ) : (
        <span className={iconWrapperClassName} aria-hidden="true">
          {icon}
        </span>
      )}
      {betweenIconAndAddress}
      {email ? (
        <a href={`mailto:${email}`} className={textLinkClassName}>
          {email}
        </a>
      ) : (
        <span className={textLinkClassName}>{FALLBACK_LABEL}</span>
      )}
    </>
  );
}
