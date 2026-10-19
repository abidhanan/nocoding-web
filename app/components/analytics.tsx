import AnalyticsLoader from "./analytics-loader";

// IDs come from environment variables (set them in Vercel > Settings > Environment Variables
// and redeploy). Nothing is loaded while a variable is empty, so it is safe to ship without them.
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID?.trim();

// Only well-formed IDs are ever written into the page.
const validGaId = gaId && /^G-[A-Z0-9]{4,}$/.test(gaId) ? gaId : undefined;
const validClarityId = clarityId && /^[a-z0-9]{4,}$/i.test(clarityId) ? clarityId : undefined;

/** Google Analytics 4 and Microsoft Clarity, loaded only after the visitor first interacts with the page. */
export default function Analytics() {
  if (!validGaId && !validClarityId) {
    return null;
  }

  return <AnalyticsLoader gaId={validGaId} clarityId={validClarityId} />;
}
