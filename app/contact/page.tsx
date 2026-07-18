import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Kaveesha Dilshan",
  description: "Start a design or development project with Kaveesha Dilshan.",
};

export default function ContactPage() {
  return <main className="inner-page"><Contact /><Footer /></main>;
}
