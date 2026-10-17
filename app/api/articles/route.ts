import { getLiveCounts } from "../../../lib/articles/stats";

/** View, like and share counts of every article, for the live numbers on the article pages. */
export async function GET() {
  return Response.json(await getLiveCounts(), { headers: { "Cache-Control": "no-store" } });
}
