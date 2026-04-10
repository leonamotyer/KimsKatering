/** Public inbox; stored encoded so naive page-source scrapers miss a contiguous address. */
export const CONTACT_EMAIL_B64 = "aW5mb0BraW1za2F0ZXJpbmcuY2E=";

export function decodeContactEmail(): string {
  if (typeof atob !== "function") return "";
  try {
    return atob(CONTACT_EMAIL_B64);
  } catch {
    return "";
  }
}
