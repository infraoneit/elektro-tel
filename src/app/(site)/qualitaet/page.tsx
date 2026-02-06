import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, Leaf, Recycle, ArrowRight, Download } from "lucide-react";
import { AnimatedContent, AnimatedHero } from "@/components/ui/PageAnimations";
import { getAllQuality } from "@/lib/cms";
import { ProjectCTA } from "@/components/ProjectCTA";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { buildAlternates } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Qualität & Nachhaltigkeit | Elektro-Tel AG",
    description: "Grundsätze zu Qualitätsmanagement, Nachhaltigkeit und Abfallentsorgung auf Baustellen.",
    alternates: buildAlternates("/qualitaet"),
};

const iconMap: { [key: string]: any } = {
    ShieldCheck, Leaf, Recycle, ShieldAlert: ShieldCheck
};

export default function QualitaetPage() {
    const qualityPages = getAllQuality();

    return (
        <div className="bg-white">
            <BreadcrumbSchema items={[
                { name: "Startseite", url: "/" },
                { name: "Qualität & Nachhaltigkeit", url: "/qualitaet" }
            ]} />
            {/* Hero Section */}
            <section className="relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-28 md:pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedHero className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-2xl mb-8">
                            <ShieldCheck className="w-10 h-10 text-green-400" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                            Qualitätsmanagement und Nachhaltigkeit
                        </h1>
                        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
                            Unsere Grundsätze zu Qualität, Nachhaltigkeit und verantwortungsvollem Handeln auf allen Baustellen.
                        </p>
                    </AnimatedHero>
                </div>
            </section>

            {/* Cards Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {qualityPages.map((page: any, index: number) => {
                            const IconComponent = iconMap[page.icon] || ShieldCheck;
                            const bgClass = page.bg || 'bg-green-50';
                            const colorClass = page.color || 'text-green-600';

                            return (
                                <AnimatedContent key={page.slug} delay={index * 0.1}>
                                    <div className={`${bgClass} rounded-lg p-8 h-full flex flex-col border border-gray-100 hover:shadow-xl transition-shadow duration-300`}>
                                        <div className={`inline-flex items-center justify-center w-16 h-16 ${bgClass} rounded-xl mb-6`}>
                                            <IconComponent className={`w-8 h-8 ${colorClass}`} />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900 mb-4">
                                            {page.title}
                                        </h2>
                                        <p className="text-slate-600 mb-6 flex-grow">
                                            {page.description}
                                        </p>
                                        <div className="space-y-3">
                                            <Link
                                                href={`/qualitaet/${page.slug}`}
                                                className={`flex items-center justify-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-sm hover:bg-green-700 transition-all`}
                                            >
                                                Mehr erfahren
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                            {page.pdfDownload && (
                                                <a
                                                    href={page.pdfDownload}
                                                    download
                                                    className="flex items-center justify-center gap-2 bg-slate-700 text-white font-semibold px-6 py-3 rounded-sm hover:bg-slate-800 transition-all"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    PDF herunterladen
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </AnimatedContent>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <ProjectCTA variant="light" />
        </div>
    );
}
