import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { createMetadata } from "@/lib/site";

export const metadata: Metadata = createMetadata({ title: "Hire a UI/UX Designer & Creative Developer", description: "Contact Kaveesha Dilshan for freelance UI/UX design, responsive web design, React development, product interfaces, and interactive digital experiences.", path: "/contact", keywords: ["hire UI/UX designer Sri Lanka", "freelance web designer Colombo", "hire React developer Sri Lanka", "UI/UX design services"] });

export default function ContactPage() {
  return <main className="inner-page"><Contact asPage /><Footer /></main>;
}
