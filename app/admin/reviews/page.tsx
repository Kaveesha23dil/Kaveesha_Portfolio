import type { Metadata } from "next";
import AdminReviews from "@/components/AdminReviews";

export const metadata: Metadata = {
  title: "Review Moderation",
  robots: { index: false, follow: false, noarchive: true, nocache: true },
};

export default function AdminReviewsPage() {
  return <AdminReviews />;
}
