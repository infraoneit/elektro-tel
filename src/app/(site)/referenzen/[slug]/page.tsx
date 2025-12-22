import { getAllReferences, getReferenceItem } from "@/lib/cms";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateStaticParams() {
    const refs = getAllReferences();
    return refs.map((item: any) => ({ slug: item.slug }));
}

type Props = {
    params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const item = getReferenceItem(params.slug);
    if (!item) return {};
    return {
        title: `${item.title} | Referenzen | Elektro-Tel`,
    };
}

export default function ReferenceDetailPage({ params }: Props) {
    const item = getReferenceItem(params.slug);
    if (!item) notFound();

    return (
        <article className="min-h-screen pb-20 bg-white">
            <div className="container mx-auto px-4 py-8">
                <Link href="/referenzen" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-red mb-8 uppercase text-sm font-bold tracking-wide transition-colors">
                    <ArrowLeft size={16} /> Alle Referenzen
                </Link>

                <div className="grid md:grid-cols-[1fr_300px] gap-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 uppercase tracking-tighter mb-8">{item.title}</h1>

                        {/* Gallery - Main Image */}
                        <div className="mb-8">
                            {(item.image || item.heroImage || (item.gallery && item.gallery[0])) && (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={item.image || item.heroImage || item.gallery?.[0]}
                                    alt={item.title}
                                    className="w-full h-auto rounded-sm shadow-lg"
                                />
                            )}
                        </div>

                        <div className="prose prose-lg prose-headings:uppercase prose-headings:font-bold prose-headings:tracking-tight text-slate-600">
                            <div dangerouslySetInnerHTML={{ __html: item.body }} />
                        </div>

                        {/* Remaining Gallery */}
                        {item.gallery && item.gallery.length > 1 && (
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-12">
                                {item.gallery.slice(1).map((img: string, i: number) => (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img key={i} src={img} alt={`${item.title} ${i + 2}`} className="w-full h-auto rounded-sm hover:opacity-90 transition-opacity cursor-pointer" />
                                ))}
                            </div>
                        )}
                    </div>

                    <aside>
                        <div className="bg-gray-50 p-8 rounded-sm sticky top-24 border-t-4 border-brand-red shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 uppercase mb-6">Projektdaten</h3>
                            <div className="space-y-6">
                                {item.client && (
                                    <div>
                                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Bauherr</span>
                                        <span className="text-slate-800 font-medium">{item.client}</span>
                                    </div>
                                )}
                                {item.architect && (
                                    <div>
                                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Architekt</span>
                                        <span className="text-slate-800 font-medium">{item.architect}</span>
                                    </div>
                                )}
                                {item.address && (
                                    <div>
                                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Ort</span>
                                        <span className="text-slate-800 font-medium">{item.address}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
