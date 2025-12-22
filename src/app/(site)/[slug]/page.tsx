import { getPageContent, getAllPages } from "@/lib/cms";
import { SectionRenderer } from "@/components/SectionRenderer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateStaticParams() {
    const pages = getAllPages();
    // Filter out home as it has its own page
    return pages.map((page) => ({ slug: page?.slug })).filter(p => p.slug !== "home");
}

type Props = {
    params: Promise<{ slug: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const page = getPageContent(slug);
    if (!page) return {};
    return {
        title: page.seoTitle || page.title,
        description: page.seoDescription,
    };
}

export default async function DynamicPage({ params }: Props) {
    const { slug } = await params;
    const page = getPageContent(slug);

    if (!page) {
        notFound();
    }

    return (
        <div className="animate-fade-in mt-20 md:mt-24">
            {/* If the user didn't add a Hero block, we might want a default header? 
           For now we assume blocks cover it. */}
            {page.blocks && page.blocks.length > 0 ? (
                <SectionRenderer blocks={page.blocks} />
            ) : (
                <div className="container mx-auto px-4 py-10 md:py-20 bg-white text-slate-900 min-h-[50vh]">
                    <h1 className="text-4xl font-bold mb-8 uppercase text-slate-900">{page.title}</h1>
                    <div className="prose prose-lg prose-slate max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: page.body }} />
                </div>
            )}
        </div>
    );
}
