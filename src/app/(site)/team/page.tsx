import { getPageContent, getTeamExperienceSettings } from "@/lib/cms";
import { SectionRenderer } from "@/components/SectionRenderer";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProjectCTA } from "@/components/ProjectCTA";
import { buildAlternates } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Team | Elektro-Tel",
    description: "Unser Team und die Geschäftsleitung der Elektro-Tel AG.",
    alternates: buildAlternates("/team"),
};

export default function TeamPage() {
    const page = getPageContent("team");
    // Use teamExperienceSettings for the "about" block (50 Jahre section)
    const teamExperienceSettings = getTeamExperienceSettings();

    if (!page) notFound();

    return (
        <div className="bg-white min-h-screen">
            <BreadcrumbSchema items={[
                { name: "Startseite", url: "/" },
                { name: "Team", url: "/team" }
            ]} />
            {/* Header */}
            <div className="bg-slate-900 text-white py-14 md:py-20 mt-20 md:mt-24">
                <div className="container mx-auto px-4 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">{page.title}</h1>
                    <p className="text-xl text-slate-300 max-w-2xl">
                        Unser starkes Team für Ihren Erfolg. Kompetent, erfahren und persönlich.
                    </p>
                </div>
            </div>

            {/* If blocks exist, render them. If not, use fallback layout if needed, but we seeded blocks. */}
            {page.blocks && page.blocks.length > 0 ? (
                <SectionRenderer
                    blocks={page.blocks}
                    aboutSettings={teamExperienceSettings}
                />
            ) : (
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl font-bold uppercase mb-8">{page.title}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Fallback if no blocks defined but page exists? 
                             Actually, SectionRenderer renders TeamGridBlock.
                             We don't need changes here if SectionRenderer is used.
                         */}
                        <div dangerouslySetInnerHTML={{ __html: page.body }} />
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <ProjectCTA variant="light" />
        </div>
    );
}

