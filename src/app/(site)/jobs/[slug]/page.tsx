import { getJobData } from "@/lib/cms";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const job = getJobData(params.slug);

    if (!job) return { title: "Job nicht gefunden" };

    return {
        title: `${job.title} | Elektro-Tel Jobs`,
        description: `Jobangebot bei Elektro-Tel.`,
    };
}

export default async function JobDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const job = getJobData(params.slug);

    if (!job) notFound();

    // JSON-LD
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": job.title,
        "description": job.html || job.intro,
        "hiringOrganization": {
            "@type": "Organization",
            "name": "Elektro-Tel AG",
            "sameAs": "https://elektro-tel.ch"
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": job.location || "Winterthur",
                "addressRegion": "ZH",
                "addressCountry": "CH"
            }
        },
        "datePosted": new Date().toISOString()
    };

    return (
        <div className="bg-white pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header */}
            <div className="bg-slate-900 text-white pt-20 pb-20">
                <div className="container mx-auto px-4 text-left">
                    <span className="inline-block bg-brand-red px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6">
                        {job.location || "Region Winterthur / Tägerwilen"}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold uppercase leading-tight mb-8">
                        {job.title}
                    </h1>

                    <div className="flex flex-wrap justify-start gap-6 text-sm font-bold uppercase tracking-wide text-slate-300">
                        <div className="flex items-center gap-2">
                            <span>100% Pensum</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Ab Sofort oder n.V.</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Festanstellung</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                <div className="max-w-none mx-auto bg-white p-8 md:p-12 shadow-xl rounded-sm">
                    <div className="prose prose-lg max-w-none text-slate-700 text-left">
                        <h2>Warum Elektro-Tel?</h2>
                        <p>Wir bieten dir mehr als nur einen Job. Bei uns bist du Teil einer Familie, die seit über 50 Jahren zusammenhält und Innovation vorantreibt.</p>

                        {/* Dynamic Content */}
                        <div dangerouslySetInnerHTML={{ __html: job.html }} />

                        <h2>Das bewirbst du dich</h2>
                        <div className="bg-gray-50 p-6 border-l-4 border-brand-red not-prose mt-8">
                            <p className="font-bold text-lg mb-2">Interessiert?</p>
                            <p className="mb-4 text-slate-600">Sende deine Unterlagen ganz unkompliziert per E-Mail oder melde dich direkt.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href={`mailto:${job.applyContact || "jobs@elektro-tel.ch"}`} className="inline-block bg-brand-red text-white font-bold py-3 px-6 rounded-sm hover:bg-brand-red-hover transition-colors text-center">
                                    Jetzt bewerben (Email)
                                </a>
                                <a href="tel:0800800813" className="inline-block bg-white border-2 border-slate-200 text-slate-700 font-bold py-3 px-6 rounded-sm hover:border-brand-red hover:text-brand-red transition-colors text-center">
                                    Anrufen
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
