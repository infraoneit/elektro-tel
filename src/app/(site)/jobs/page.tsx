import { getAllJobs } from "@/lib/cms";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jobs | Elektro-Tel",
    description: "Karriere bei Elektro-Tel. Werden Sie Teil unseres Teams.",
};

export default function JobsPage() {
    const jobs = getAllJobs();

    return (
        <div className="bg-white">
            {/* Jobs Page Content */}
            {/* Header */}
            <div className="bg-slate-900 text-white py-14 md:py-20 mt-20 md:mt-24">
                <div className="container mx-auto px-4 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">Jobs – Karriere bei Elektro-Tel</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto md:mx-0">
                        Gestalten Sie mit uns die Zukunft der Gebäudetechnik. Wir suchen Talente, die anpacken.
                    </p>
                </div>
            </div>

            {/* 7.1 Warum Elektro-Tel */}
            <section className="py-14 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold uppercase text-slate-900 mb-8 md:mb-10 text-left">Warum Elektro-Tel</h2>
                    <div className="grid md:grid-cols-3 gap-8 mx-auto text-left">
                        {[
                            "Seit 1968 etabliert",
                            "Abwechslungsreiche Projekte",
                            "Service & Pikett mit Struktur",
                            "Moderne Arbeitsmittel",
                            "Team mit kurzen Wegen"
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-gray-50 rounded-sm hover:-translate-y-1 transition-transform border-b-4 border-brand-red flex items-center justify-start h-full">
                                <p className="font-bold text-lg text-slate-800">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7.2 Benefits */}
            <section className="py-14 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold uppercase text-slate-900 mb-8 md:mb-10 text-left">Deine Benefits</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
                        {[
                            "Top Ausrüstung", "Geschäftsauto", "Weiterbildung", "Faire Löhne",
                            "Teamevents", "5 Wochen Ferien", "Moderne IT", "Flexible Zeiten",
                            "Nachhaltigkeit", "Krisensicher", "Gute Vorsorge", "Parkplätze"
                        ].map((benefit, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-sm shadow-sm h-full">
                                <div className="w-2 h-2 bg-brand-red rounded-full flex-shrink-0" />
                                <span className="font-medium text-slate-700 text-sm">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7.3 Bewerbungsprozess */}
            <section className="py-14 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold uppercase text-slate-900 mb-12 md:mb-16 text-left">Bewerbungsprozess</h2>
                    <div className="flex flex-col md:flex-row justify-start items-start gap-8 relative mx-auto">
                        {/* Line - Hidden for now as left align makes it tricky, or adjust it */}
                        <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-1 bg-gray-100 -z-10"></div>

                        {[
                            { step: 1, title: "Kontakt", text: "Sende uns deine Unterlagen oder ruf an." },
                            { step: 2, title: "Gespräch", text: "Wir lernen uns persönlich kennen." },
                            { step: 3, title: "Start", text: "Willkommen im Team!" },
                        ].map((step, i) => (
                            <div key={i} className="flex flex-col items-start bg-white p-4 w-64 text-left">
                                <div className="w-16 h-16 rounded-full bg-brand-red text-white flex items-center justify-center text-2xl font-bold mb-6 ring-8 ring-white">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-bold uppercase mb-2">{step.title}</h3>
                                <p className="text-slate-600 text-sm">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7.4 Offene Stellen */}
            <section className="py-14 md:py-20 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold uppercase text-slate-900 mb-8 md:mb-10 text-left">Offene Stellen</h2>

                    <div className="grid grid-cols-1 gap-6 mx-auto">
                        {jobs.length > 0 ? jobs.map((job: any, i: number) => (
                            <Link href={`/jobs/${job.slug}`} key={i} className="block group bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-all border-l-4 border-transparent hover:border-brand-red">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-brand-red text-xs font-bold uppercase tracking-widest bg-brand-red/10 px-2 py-1 rounded-sm">
                                                {job.location || "Winterthur & Tägerwilen"}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-brand-red transition-colors">
                                            {job.title}
                                        </h3>
                                        <p className="text-slate-600 line-clamp-1">
                                            {job.intro || "Wir suchen Verstärkung für unser Team."}
                                        </p>
                                    </div>
                                    <button className="px-6 py-3 bg-slate-900 text-white font-bold uppercase text-sm rounded-sm group-hover:bg-brand-red transition-colors whitespace-nowrap">
                                        Stelle ansehen
                                    </button>
                                </div>
                            </Link>
                        )) : (
                            <div className="text-center py-12 bg-white rounded-sm">
                                <p className="text-slate-500">Aktuell sind keine offenen Stellen ausgeschrieben.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
