import { getAllReferences } from "@/lib/cms";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

/**
 * Renders a horizontal scrolling slider of reference projects.
 * Used on the homepage to showcase recent work.
 */
export async function ReferencesSliderBlock({ title }: { title: string }) {
    const refs = getAllReferences().slice(0, 6); // Take first 6

    return (
        <section className="py-10 md:py-20 bg-slate-900 text-white overflow-hidden">
            <div className="container mx-auto px-4 mb-8 md:mb-12 flex justify-between items-end">
                <Link href="/referenzen" className="group">
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight group-hover:text-brand-red transition-colors">{title}</h2>
                </Link>
                <Link href="/referenzen" className="text-brand-red font-bold uppercase text-sm hover:underline flex items-center gap-1">
                    Alle Referenzen <ArrowRight size={16} />
                </Link>
            </div>

            {/* Simple Horizontal Scroll / Slider */}
            <div className="flex overflow-x-auto gap-6 px-4 pb-8 -mx-4 container mx-auto snap-x">
                {refs.map((item: any, i: number) => (
                    <Link key={i} href={`/referenzen#${item.slug}`} className="flex-shrink-0 w-[300px] md:w-[400px] snap-center group">
                        <div className="aspect-[4/3] bg-gray-800 mb-4 relative overflow-hidden rounded-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {(item.image || item.heroImage || (item.gallery && item.gallery[0])) && (
                                <ImageWithFallback
                                    src={item.image || item.heroImage || item.gallery?.[0]}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                />
                            )}
                        </div>
                        <h3 className="text-xl font-bold uppercase truncate group-hover:text-brand-red transition-colors">{item.title}</h3>
                        <p className="text-slate-400 text-sm">{item.address}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
