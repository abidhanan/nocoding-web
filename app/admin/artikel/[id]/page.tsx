import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/articles/auth";
import { getArticleById, readAllFresh } from "../../../../lib/articles/store";
import Editor from "../../editor";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();

  const { id } = await params;
  const knownCategories = Array.from(new Set((await readAllFresh()).flatMap((item) => item.categories))).sort();

  if (id === "baru") {
    return <Editor article={null} knownCategories={knownCategories} />;
  }

  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return <Editor article={article} knownCategories={knownCategories} />;
}
