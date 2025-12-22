import { getPageContent } from "@/lib/cms";
import { SectionRenderer } from "@/components/SectionRenderer";
import { notFound } from "next/navigation";

export default function Home() {
  const page = getPageContent("home");

  if (!page) {
    notFound();
  }

  return (
    <SectionRenderer blocks={page.blocks} />
  );
}
