/** The visitor's country, as reported by the CDN in front of the site. Used to pick currency and billing period. */
export async function GET(request: Request) {
  const country = (request.headers.get("cf-ipcountry") ?? request.headers.get("x-vercel-ip-country") ?? "").toUpperCase();

  return Response.json(
    { country: /^[A-Z]{2}$/.test(country) ? country : null },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
