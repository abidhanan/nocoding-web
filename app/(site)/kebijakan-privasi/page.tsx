import type { Metadata } from "next";
import LegalDocument from "../../components/legal-document";
import { privacyPolicy as doc } from "../../components/legal-content";
import { Footer } from "../../components/site-footer";

export const metadata: Metadata = {
  title: doc.name.id,
  description: doc.description.id,
  alternates: { canonical: `/${doc.slug}` },
};

export default function Page() {
  return (
    <>
      <LegalDocument doc={doc} />
      <Footer />
    </>
  );
}
