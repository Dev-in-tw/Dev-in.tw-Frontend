// type
import { type NextRequest } from "next/server";

// api
import apiClient from "@/api";


export async function GET(
  request: NextRequest,
  { params }: { params: { service: string } },
) {
  if (params.service === "github") {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return Response.json({ error: "Missing request params" });
    }

    const data = await apiClient.auth.github.post(code);

    return Response.redirect(process.env.NEXT_PUBLIC_APP_URL + "/callback?token=" + data.token);
  }
}
