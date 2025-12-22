import { getAllJobs } from "@/lib/cms";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Renders a preview of open job positions.
 * Fetches the latest 3 jobs from the CMS content.
 */
export async function JobsPreviewBlock({ title }: { title: string }) {
    const jobs = getAllJobs().slice(0, 3); // Show max 3 jobs
    // Sort logic is now in getAllJobs() to ensure date sorting.

    return (
        <section className="py-10 md:py-20 bg-brand-red text-white">
            <div className="container mx-auto px-4 text-left">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
                    <Link href="/jobs" className="group">
                        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight group-hover:text-slate-200 transition-colors">{title}</h2>
                    </Link>

                    <Link href="/jobs" className="inline-block bg-white text-brand-red font-bold uppercase py-3 px-6 rounded-sm hover:bg-slate-100 transition-colors">
                        Warum Elektro-Tel?
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jobs.map((job: any, i: number) => (
                        <Link key={i} href={`/jobs/${job.slug}`} className="bg-white/10 p-6 rounded-sm hover:bg-white/20 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-70">{job.location || "Winterthur"}</span>
                                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform" />
                            </div>
                            <h3 className="text-xl font-bold uppercase leading-tight mb-2">{job.title}</h3>
                        </Link>
                    ))}

                    {/* Fallback if no jobs */}
                    {jobs.length === 0 && (
                        <div className="col-span-3 text-center py-8 opacity-50 border border-dashed border-white/30 rounded-sm">
                            Zur Zeit keine offenen Stellen. Initiativbewerbungen willkommen.
                        </div>
                    )}
                </div>

                <div className="mt-8 text-left">
                    <Link href="/jobs" className="font-bold uppercase text-sm border-b-2 border-white/50 hover:border-white transition-colors pb-1 inline-block">
                        Alle offenen Stellen ansehen
                    </Link>
                </div>
            </div>
        </section>
    );
}
