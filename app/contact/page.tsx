import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { createMetadata } from "@/lib/site";

export const metadata: Metadata = createMetadata({ title: "Contact", description: "Contact Kaveesha Dilshan to discuss UI/UX design, creative development, responsive website, product interface, or motion-rich digital experience work.", path: "/contact" });

export default function ContactPage() {
  return <main className="inner-page"><Contact asPage /><Footer /></main>;
}
