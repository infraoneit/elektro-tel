import { getAllTeam } from "@/lib/cms";
import Link from "next/link";
import { Mail } from "lucide-react";

/**
 * Renders a grid of team members.
 * Fetches all team data from the CMS.
 */
export async function TeamGridBlock({ title, subtitle, count }: { title: string, subtitle?: string, count?: number }) {
    const allTeam = getAllTeam();
    const team = count ? allTeam.slice(0, count) : allTeam;

    return (
        <section className="py-10 md:py-20 bg-white">
            <div className="container mx-auto px-4 text-left">
                {subtitle && <p className="text-brand-red font-bold uppercase tracking-widest mb-2 text-sm md:text-base">{title}</p>}
                {/* On Home, title might be "Unser Management", on Team Page it might be "Geschäftsleitung". 
            We want 'Unser Management' on Home to link to /team? Or just a button.
            User: "auf der Hauptseite müss die jeweilige section auf die entsprechende unterseite verlinken"
        */}
                <Link href="/team" className="inline-block group mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase text-slate-900 group-hover:text-brand-red transition-colors tracking-tight">{subtitle || title}</h2>
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member: any, i: number) => (
                        <div key={i} className="group text-center">
                            <div className="aspect-[4/5] bg-gray-100 mb-6 relative overflow-hidden rounded-sm mx-auto max-w-[300px]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                {member.image ? (
                                    <img src={member.image} alt={member.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                                        Kein Bild
                                    </div>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 uppercase mb-1">{member.title}</h3>
                            <p className="text-slate-600 text-sm mb-4 min-h-[40px] whitespace-pre-line">
                                {[member.jobTitle, member.role].filter(Boolean).join(" / ")}
                            </p>

                            <a href={`mailto:${member.email || "info@elektro-tel.ch"}`} className="inline-flex items-center gap-2 text-brand-red font-bold uppercase text-xs tracking-wider border border-brand-red px-4 py-2 hover:bg-brand-red hover:text-white transition-colors">
                                <Mail size={14} /> Nachricht schicken
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
