import { getPublishedArticles } from "../../../../lib/articles/store";
import { recordAction, type StatAction } from "../../../../lib/articles/stats";

type Context = { params: Promise<{ id: string }> };

const ACTIONS: StatAction[] = ["view", "like", "unlike", "share"];

async function exists(id: string) {
  return (await getPublishedArticles()).some((article) => article.id === id);
}

const noStore = { "Cache-Control": "no-store" };

/** Records a view, like, unlike or share. The browser makes sure each is only sent once. */
export async function POST(request: Request, { params }: Context) {
  const { id } = await params;
  const body = (await request.json().catch(() => null)) as { action?: unknown } | null;
  const action = ACTIONS.find((value) => value === body?.action);

  if (!action || !(await exists(id))) {
    return Response.json({ error: "Bad request" }, { status: 400, headers: noStore });
  }

  return Response.json(await recordAction(id, action), { headers: noStore });
}
