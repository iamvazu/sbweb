import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Procurement Desk — Stronger Built",
  description: "Get in touch with the Stronger Built project management and procurement desk. Reach out with general inquiries, subcontractor applications, or custom quotes.",
};

export default function Page() {
  return <ContactClient />;
}
