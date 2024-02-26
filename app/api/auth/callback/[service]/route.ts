// type
import { type NextRequest } from "next/server";

// api
import apiClient from "@/api";

export async function GET(
  request: NextRequest,
  { params }: { params: { service: string } }
) {
  if (params.service === "github") {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    let data;

    if (!code) {
      return Response.json({ error: "Missing request params" })
    }

    await apiClient.auth.github.post(code)
      .then((res) => {
        data = res.account_data;
      })

    return Response.json(data);
  }
}