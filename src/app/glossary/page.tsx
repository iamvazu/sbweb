import type { Metadata } from "next";
import GlossaryClient from "./glossary-client";

export const metadata: Metadata = {
  title: "GovCon Glossary: Government Contracting Terms & Definitions | Stronger Built",
  description: "Demystify government contracting jargon. Search and filter over 490+ federal, state, and municipal procurement acronyms, terms, and definitions in our free interactive glossary.",
};

export default function Page() {
  return <GlossaryClient />;
}
