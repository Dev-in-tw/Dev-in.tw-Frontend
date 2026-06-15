// type
import type { NextRequest } from "next/server";

// api
import apiClient from "@/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ service: string }> }
) {
  const { service } = await params;

  if (service === "github") {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return Response.json({ error: "Missing request params" });
    }

    const data = await apiClient.auth.github.post(code);

    return Response.redirect(
      `${process.env.APP_URL}/callback?token=${data.token}`
    );
  }
}
