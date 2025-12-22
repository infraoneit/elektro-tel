import { getAllNews } from "@/lib/cms";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const news = getAllNews();
    const item = news.find((i: any) => i.slug === params.slug);
    if (!item) return {};
    return {
        title: `${item.title} | Elektro-Tel`,
        description: item.excerpt,
    };
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
    const news = getAllNews();
    const item = news.find((i: any) => i.slug === params.slug);

    if (!item) {
        notFound();
    }

    return (
        <article className="min-h-screen pb-20">
            {/* Hero */}
            <div className="relative h-[300px] md:h-[400px]">
                <div className="absolute inset-0 bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {item.heroImage && (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                            <img src={item.heroImage} alt={item.title} className="max-w-full max-h-full object-contain" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 pb-12">
                    <div className="container mx-auto">
                        <Link href="/news" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 uppercase text-sm font-bold tracking-wide transition-colors">
                            <ArrowLeft size={16} /> Zurück zur Übersicht
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter max-w-4xl leading-tight mb-4">
                            {item.title}
                        </h1>
                        <div className="flex items-center gap-4 text-brand-red font-bold uppercase tracking-wider">
                            <time>{new Date(item.date).toLocaleDateString("de-CH")}</time>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto prose prose-lg prose-headings:uppercase prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-red hover:prose-a:underline prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5 prose-li:marker:text-brand-red">
                    <div dangerouslySetInnerHTML={{ __html: item.body }} />
                </div>
            </div>
        </article>
    );
}
