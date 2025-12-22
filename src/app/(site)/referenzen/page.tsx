import { getAllReferences } from "@/lib/cms";
import { Metadata } from "next";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

export const metadata: Metadata = {
    title: "Referenzen | Elektro-Tel",
    description: "Auszug aus realisierten Projekten.",
};

export default function ReferencesPage() {
    const refs = getAllReferences();

    return (
        <div className="bg-white">
            {/* Header */}
            <div className="bg-slate-900 text-white py-14 md:py-20 mt-20 md:mt-24">
                <div className="container mx-auto px-4 text-left">
                    <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4 md:mb-6">Referenzen</h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
                        Auszug aus realisierten Projekten.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-14 md:py-20">

                <div className="space-y-24">
                    {refs.map((item: any, index: number) => (
                        <section key={index} id={item.slug} className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start border-t border-gray-100 pt-16 first:border-0 first:pt-0 scroll-mt-32">
                            {/* Content */}
                            <div className="flex flex-col items-start text-left">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="text-white bg-brand-red px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm">
                                        {item.category || "Projekt"}
                                    </span>
                                    {item.address && (
                                        <span className="text-slate-500 bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm">
                                            {item.address}
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-3xl font-bold uppercase text-slate-900 mb-6">{item.title}</h2>

                                <div className="prose text-slate-700 mb-8 max-w-none break-words">
                                    <div dangerouslySetInnerHTML={{ __html: item.body }} />
                                </div>

                                <div className="bg-gray-50 p-6 rounded-sm border-l-4 border-brand-red w-full shadow-sm">
                                    <h4 className="font-bold uppercase text-sm mb-4 text-slate-900 border-b border-gray-200 pb-2">Projektdaten</h4>
                                    <ul className="space-y-3 text-sm text-slate-700 break-words">
                                        {item.client && (
                                            <li className="flex flex-col sm:flex-row sm:gap-2">
                                                <span className="font-bold w-24 shrink-0">Bauherr:</span>
                                                <span>{item.client}</span>
                                            </li>
                                        )}
                                        {item.architect && (
                                            <li className="flex flex-col sm:flex-row sm:gap-2">
                                                <span className="font-bold w-24 shrink-0">Architekt:</span>
                                                <span>{item.architect}</span>
                                            </li>
                                        )}
                                        {item.works && (
                                            <li className="flex flex-col sm:flex-row sm:gap-2">
                                                <span className="font-bold w-24 shrink-0">Arbeiten:</span>
                                                <span>{item.works}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="h-full">
                                <div className="aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden shadow-md relative group">
                                    {item.image || item.heroImage ? (
                                        <ImageWithFallback
                                            src={item.image || item.heroImage}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-300 p-8 text-center">
                                            <div className="text-4xl font-bold mb-2 opacity-20">ELEKTRO-TEL</div>
                                            <div className="text-sm font-medium uppercase tracking-widest opacity-40">Referenzprojekt</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
