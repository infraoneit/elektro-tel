import { getAllNews } from "@/lib/cms";
import Link from "next/link";
import { ArrowRight, Trophy, Phone, Handshake, Newspaper, ShieldCheck, Wrench, Info } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

/**
 * Renders a grid of the latest news items.
 * Includes logic to auto-assign icons/colors based on keywords in the title if no image is provided.
 * 
 * @param count - Number of news items to display
 */
export async function NewsPreviewBlock({ count }: { count: number }) {
    const news = getAllNews().slice(0, count);

    const getIcon = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes("lehr")) return { icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" };
        if (t.includes("service") || t.includes("hotline")) return { icon: Phone, color: "text-brand-red", bg: "bg-red-50" };
        if (t.includes("partner") || t.includes("infraone")) return { icon: Handshake, color: "text-blue-600", bg: "bg-blue-50" };
        return { icon: Newspaper, color: "text-slate-500", bg: "bg-gray-100" };
    };

    const iconMap: Record<string, any> = {
        'Newspaper': { icon: Newspaper, color: "text-slate-500", bg: "bg-gray-100" },
        'Trophy': { icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" },
        'Phone': { icon: Phone, color: "text-brand-red", bg: "bg-red-50" },
        'Handshake': { icon: Handshake, color: "text-blue-600", bg: "bg-blue-50" },
        'Wrench': { icon: Wrench, color: "text-brand-red", bg: "bg-red-50" },
        'ShieldCheck': { icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50" },
        'Info': { icon: Info, color: "text-sky-600", bg: "bg-sky-50" },
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 text-left">
                <Link href="/news" className="block w-fit mb-12 group">
                    <p className="text-brand-red font-bold uppercase tracking-widest mb-2">Aktuelles</p>
                    <h2 className="text-4xl font-bold uppercase text-slate-900 tracking-tight group-hover:text-brand-red transition-colors">News</h2>
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {news.map((item: any, i: number) => {
                        // Determine visual: Explicit Image > Explicit Icon > Auto Icon
                        let IconComponent = Newspaper;
                        let iconStyles = { color: "text-slate-500", bg: "bg-gray-100" };

                        if (item.icon && iconMap[item.icon]) {
                            const mapEntry = iconMap[item.icon];
                            IconComponent = mapEntry.icon;
                            iconStyles = { color: mapEntry.color, bg: mapEntry.bg };
                        } else {
                            // Fallback
                            const fallback = getIcon(item.title);
                            IconComponent = fallback.icon;
                            iconStyles = { color: fallback.color, bg: fallback.bg };
                        }

                        const { color, bg } = iconStyles;
                        const isInfraone = item.title.toLowerCase().includes("infraone");

                        return (
                            <Link key={i} href={`/news#${item.slug}`} className="group block bg-white hover:shadow-xl transition-all duration-300 rounded-sm border border-gray-100 overflow-hidden h-full flex flex-col">
                                <div className={`aspect-video relative overflow-hidden flex items-center justify-center ${bg}`}>
                                    {item.heroImage ? (
                                        <ImageWithFallback
                                            src={item.heroImage}
                                            alt={item.title}
                                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : isInfraone ? (
                                        <div className="w-full h-full p-8 flex items-center justify-center bg-slate-50">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/partners/infraone-logo-schwarz.svg" alt="Infraone Logo" className="max-w-full max-h-full object-contain" />
                                        </div>
                                    ) : (
                                        <IconComponent size={64} className={`${color} group-hover:scale-110 transition-transform duration-500`} />
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="text-xs text-brand-red font-bold mb-2 block">{new Date(item.date).toLocaleDateString("de-CH")}</span>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-red transition-colors line-clamp-2">{item.title}</h3>
                                    <p className="text-slate-600 text-sm line-clamp-3 mb-4">{item.excerpt}</p>
                                    <span className="mt-auto text-sm font-bold uppercase flex items-center gap-2 group-hover:translate-x-2 transition-transform">Mehr erfahren <ArrowRight size={14} /></span>
                                </div>
                            </Link>
                        );
                    })}
                    {news.length === 0 && (
                        <div className="col-span-3 text-center py-12 text-slate-500 border border-dashed border-slate-300">
                            Noch keine Neuigkeiten veröffentlicht.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
