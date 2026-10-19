// Approximate rupiah exchange rates, used when the live source is not reachable.
const fallbackRates: Record<string, number> = {
  IDR: 1,
  USD: 0.000061,
  EUR: 0.000053,
  GBP: 0.000046,
  JPY: 0.0091,
  AUD: 0.000094,
  CAD: 0.000085,
  CHF: 0.000049,
  SGD: 0.000079,
  MYR: 0.00026,
  INR: 0.0051,
  CNY: 0.00043,
  KRW: 0.087,
  BRL: 0.00033,
  MXN: 0.0011,
};

/** Rupiah exchange rates (1 IDR in each currency), refreshed once a day from ExchangeRate-API. */
export async function GET() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/IDR", { next: { revalidate: 43200 } });
    const data = (await response.json()) as { result?: string; rates?: Record<string, number>; time_last_update_utc?: string };

    if (data.result === "success" && data.rates) {
      return Response.json(
        { rates: data.rates, updated: data.time_last_update_utc ?? null, live: true },
        { headers: { "Cache-Control": "public, max-age=3600, s-maxage=43200" } },
      );
    }
  } catch {
    // Fall through to the built-in table.
  }

  return Response.json(
    { rates: fallbackRates, updated: null, live: false },
    { headers: { "Cache-Control": "public, max-age=600, s-maxage=1800" } },
  );
}
