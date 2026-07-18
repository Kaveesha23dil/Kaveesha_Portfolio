import type { Metadata } from "next";
import IntrinsicCaseStudy from "@/components/IntrinsicCaseStudy";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Intrinsic Tech Website Redesign — Kaveesha Dilshan",
  description: "UI/UX case study for the responsive redesign of the Intrinsic Tech AI consultancy website.",
};

export default function IntrinsicTechPage() {
  return <><IntrinsicCaseStudy /><Footer /></>;
}
