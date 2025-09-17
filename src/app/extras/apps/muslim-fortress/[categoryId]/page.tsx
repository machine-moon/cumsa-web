import React from "react";
import { AzkarLayout } from "@/components/azkar/AzkarLayout";
import { fetchCategories } from "@/lib/azkar/api";

export const dynamic = "force-static";

export async function generateStaticParams() {
  try {
    const cats = await fetchCategories();
    return cats.slice(0, 50).map((c) => ({ categoryId: String(c.ID) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ categoryId: string }> }) {
  const resolvedParams = await params;
  return { title: `Azkar Category ${resolvedParams.categoryId} | CUMSA` };
}

export default async function Page({ params }: { params: Promise<{ categoryId: string }> }) {
  const resolvedParams = await params;
  const idNum = Number(resolvedParams.categoryId);
  return (
    <main className="p-4 container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Azkar Portal</h1>
      <AzkarLayout initialCategoryId={Number.isFinite(idNum) ? idNum : undefined} />
    </main>
  );
}
