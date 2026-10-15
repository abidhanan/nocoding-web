import Script from "next/script";

// IDs come from environment variables (set them in Vercel > Settings > Environment Variables
// and redeploy). Nothing is loaded while a variable is empty, so it is safe to ship without them.
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID?.trim();

// Only well-formed IDs are ever written into the page.
const validGaId = gaId && /^G-[A-Z0-9]{4,}$/.test(gaId) ? gaId : undefined;
const validClarityId = clarityId && /^[a-z0-9]{4,}$/i.test(clarityId) ? clarityId : undefined;

/** Google Analytics 4 and Microsoft Clarity, loaded after the page is idle so they do not slow it down. */
export default function Analytics() {
  return (
    <>
      {validGaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${validGaId}`} strategy="lazyOnload" />
          <Script id="ga4-init" strategy="lazyOnload">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${validGaId}');`}
          </Script>
        </>
      ) : null}
      {validClarityId ? (
        <Script id="clarity-init" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${validClarityId}");`}
        </Script>
      ) : null}
    </>
  );
}
