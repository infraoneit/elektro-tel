import { Link2 } from "lucide-react";
import { Metadata } from "next";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { getAllPartners } from "@/lib/cms";
import { marked } from "marked";

export const metadata: Metadata = {
    title: "Partner | Elektro-Tel",
    description: "Unsere starken Partner für Qualität und Innovation.",
};

export default async function PartnerPage() {
    const rawPartners = getAllPartners();

    // Sort partners: Order 1 comes first, then others.
    const partners = rawPartners.sort((a: any, b: any) => {
        const orderA = a.order || 99;
        const orderB = b.order || 99;
        return orderA - orderB;
    });

    return (
        <div className="bg-white">
            {/* Header */}
            <div className="bg-slate-900 text-white py-14 md:py-20 mt-20 md:mt-24">
                <div className="container mx-auto px-4 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">Partner und Lieferanten</h1>
                    <p className="text-xl text-slate-300 max-w-2xl">
                        Starke Partnerschaften für beste Resultate. Wir setzen auf bewährte Qualität.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-14 md:py-20">
                <div className="grid grid-cols-1 gap-8 md:gap-12 max-w-5xl">
                    {partners.map((partner: any, i: number) => {
                        const bodyHtml = marked.parse(partner.body || "");
                        return (
                            <div key={i} className="flex flex-col md:flex-row gap-8 items-start bg-gray-50 p-8 rounded-sm border-l-4 border-brand-red hover:shadow-lg transition-shadow w-full">

                                {/* Logo Wrapper */}
                                <div className="w-full md:w-64 h-32 bg-white flex items-center justify-center p-4 rounded-sm shrink-0 border border-gray-100 relative shadow-sm">
                                    <ImageWithFallback
                                        src={partner.logo}
                                        alt={partner.title}
                                        className="max-w-full max-h-full object-contain"
                                        fallbackSrc="/partners/partner-placeholder.svg"
                                    />
                                </div>

                                <div className="flex-grow">
                                    <div className="flex flex-wrap items-baseline gap-4 mb-2">
                                        <h3 className="text-2xl font-bold uppercase text-slate-900">{partner.title}</h3>
                                        {partner.url && partner.url !== "#" && (
                                            <a href={partner.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-red font-bold uppercase text-xs hover:underline">
                                                Webseite <Link2 size={12} />
                                            </a>
                                        )}
                                    </div>

                                    {/* Render Markdown Content */}
                                    <div
                                        className="prose prose-slate max-w-none prose-a:text-brand-red prose-a:no-underline hover:prose-a:underline prose-p:text-slate-700 prose-p:leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: bodyHtml as string }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
