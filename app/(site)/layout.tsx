import Analytics from "../components/analytics";
import AutoLanguage from "../components/auto-language";
import LanguageController from "../components/language-controller";
import { LocalizedText } from "../components/localized-text";
import Navbar from "../components/navbar";
import PageTransition from "../components/page-transition";
import PendingSectionScroll from "../components/pending-section-scroll";
import ScrollRevealController from "../components/scroll-reveal-controller";
import { WhatsAppFloat } from "../components/whatsapp";

/** Public site chrome: navbar, language switch, reveal animations, WhatsApp button and analytics. */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-brand-dark"
      >
        <LocalizedText id="skip.content">Lewati ke konten</LocalizedText>
      </a>
      <Navbar />
      <LanguageController />
      <AutoLanguage />
      <ScrollRevealController />
      <PendingSectionScroll />
      <PageTransition>{children}</PageTransition>
      <WhatsAppFloat />
      <Analytics />
    </>
  );
}
