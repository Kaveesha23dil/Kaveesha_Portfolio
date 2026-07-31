import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function headers(prefer?: string): HeadersInit {
  return {
    apikey: supabaseKey ?? "",
    Authorization: `Bearer ${supabaseKey ?? ""}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

function unavailable() {
  return NextResponse.json({ message: "Review service is not configured." }, { status: 503 });
}

export async function GET() {
  if (!supabaseUrl || !supabaseKey) return unavailable();
  const columns = "id,full_name,job_title,company_name,avatar_url,review_text,rating,project_type,created_at";
  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/reviews?status=eq.approved&select=${columns}&order=created_at.desc`,
      { headers: headers(), cache: "no-store" },
    );
    const body = await response.text();
    return new NextResponse(body, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("Content-Type") || "application/json" },
    });
  } catch {
    return NextResponse.json({ message: "Review service is temporarily unavailable." }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  if (!supabaseUrl || !supabaseKey) return unavailable();
  try {
    const submission = await request.json();
    if (
      typeof submission.avatar_url !== "string" ||
      !/^data:image\/(jpeg|png|webp);base64,/.test(submission.avatar_url) ||
      submission.avatar_url.length > 700_000
    ) {
      return NextResponse.json({ message: "Please add a valid profile image under 5 MB." }, { status: 400 });
    }
    const response = await fetch(`${supabaseUrl}/rest/v1/reviews`, {
      method: "POST",
      headers: headers("return=minimal"),
      body: JSON.stringify(submission),
    });
    if (response.ok) return new NextResponse(null, { status: 204 });
    const body = await response.text();
    return new NextResponse(body, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("Content-Type") || "application/json" },
    });
  } catch {
    return NextResponse.json({ message: "Review submission could not be processed." }, { status: 400 });
  }
}
