import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({ title: "Blog — Design & Development Notes", description: "Ideas, experiments, and perspectives on design and creative development from Kaveesha Dilshan.", path: "/blog" });

export default function BlogPage() {
  return <main className="inner-page"><Blog asPage /><Footer /></main>;
}
