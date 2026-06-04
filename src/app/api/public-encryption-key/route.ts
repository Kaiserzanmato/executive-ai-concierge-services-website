import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const key = process.env.LEAD_ENCRYPTION_PUBLIC_KEY_JWK;

  if (!key) {
    return NextResponse.json(
      { error: "Public encryption key unavailable." },
      { status: 500 }
    );
  }

  return new NextResponse(key, {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=3600",
    },
  });
}
