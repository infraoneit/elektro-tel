import { getAllNews } from "@/lib/cms";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Metadata } from "next";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import {
    Calendar, Newspaper, Trophy, Wrench, ShieldCheck, Handshake, Info, Phone
} from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { ProjectCTA } from "@/components/ProjectCTA";
import { buildAlternates } from "@/lib/seo";

export const metadata: Metadata = {
    title: "News | Elektro-Tel",
    description: "Aktuelles von Elektro-Tel: Partnerschaften, Erfolge und Informationen.",
    alternates: buildAlternates("/news"),
};

// Helper to determine icon based on title or content keywords
function getNewsIcon(title: string) {
    const t = title.toLowerCase();
    if (t.includes("partner") || t.includes("infraone")) return { icon: Handshake, color: "text-blue-600", bg: "bg-blue-50" };
    if (t.includes("lehr") || t.includes("gratulation") || t.includes("schluss")) return { icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" };
    if (t.includes("service") || t.includes("hotline")) return { icon: Phone, color: "text-brand-red", bg: "bg-red-50" };
    if (t.includes("sicher") || t.includes("quali")) return { icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50" };
    return { icon: Newspaper, color: "text-slate-600", bg: "bg-slate-100" };
}

export default function NewsPage() {
    const news = getAllNews();
    // sort descending by date
    const sortedNews = news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Icon mapping
    const iconMap: Record<string, any> = {
        'Newspaper': { icon: Newspaper, color: "text-slate-600", bg: "bg-slate-100" },
        'Trophy': { icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" },
        'Phone': { icon: Wrench, color: "text-brand-red", bg: "bg-red-50" }, // Phone mapped to Wrench or Phone? In config it was 'Phone' value.
        // Wait, in NewsPreview it was Phone icon. Here Wrench is imported. I should import Phone?
        // Existing imports: Calendar, Newspaper, Trophy, Wrench, ShieldCheck, Handshake, Info.
        // I need to add Phone to imports if I use it.
        // Or map 'Phone' value to Wrench? Config said 'Phone (Service)'.
        // Let's check imports again.
        // File has: `import { Calendar, Newspaper, Trophy, Wrench, ShieldCheck, Handshake, Info } from "lucide-react";`
        // I should ADD `Phone` to imports.
        'Handshake': { icon: Handshake, color: "text-blue-600", bg: "bg-blue-50" },
        'Wrench': { icon: Wrench, color: "text-brand-red", bg: "bg-red-50" },
        'ShieldCheck': { icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50" },
        'Info': { icon: Info, color: "text-sky-600", bg: "bg-sky-50" },
    };

    return (
        <div className="bg-white">
            <BreadcrumbSchema items={[
                { name: "Startseite", url: "/" },
                { name: "News", url: "/news" }
            ]} />
            {/* Header */}
            <div className="bg-slate-900 text-white py-14 md:py-20 mt-20 md:mt-24">
                <div className="container mx-auto px-4 text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter mb-4 sm:mb-6">News – Aktuelles</h1>
                    <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl">
                        Neuigkeiten aus unserem Unternehmen. Partnerschaften, Erfolge und Informationen.
                    </p>
                </div>
            </div>

            {/* News List */}
            <div className="container mx-auto px-4 py-10 sm:py-12 md:py-16">
                <StaggerContainer className="space-y-12">
                    {sortedNews.map((item: any, index: number) => {
                        let IconComponent = Newspaper;
                        let iconStyles = { color: "text-slate-600", bg: "bg-slate-100" };

                        if (item.icon && iconMap[item.icon]) {
                            const mapEntry = iconMap[item.icon];
                            IconComponent = mapEntry.icon;
                            // Use map colors but fallback to default if missing (shouldn't happen)
                            iconStyles = { color: mapEntry.color, bg: mapEntry.bg };
                        } else {
                            // Fallback
                            const style = getNewsIcon(item.title);
                            IconComponent = style.icon;
                            iconStyles = { color: style.color, bg: style.bg };
                        }

                        return (
                            <StaggerItem key={index} className="scroll-mt-32 flex flex-col md:flex-row gap-6 md:gap-8 bg-white p-6 md:p-8 rounded-sm shadow-sm md:hover:shadow-md transition-shadow border border-gray-100 items-start" id={item.slug}>
                                {/* Date & Icon Column */}
                                <div className="flex md:flex-col items-center gap-4 md:w-32 shrink-0 text-center md:pt-2">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${iconStyles.bg} ${iconStyles.color}`}>
                                        <IconComponent size={28} />
                                    </div>
                                    <div className="flex flex-col items-start md:items-center">
                                        <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
                                            <Calendar size={14} />
                                            <time dateTime={item.date}>
                                                {item.date ? format(new Date(item.date), "dd.MM.yyyy", { locale: de }) : "-"}
                                            </time>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Column */}
                                <div className="flex-grow">
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase text-slate-900 mb-3 sm:mb-4">{item.title}</h2>

                                    {item.heroImage && (
                                        <div className="mb-6 rounded-sm overflow-hidden bg-gray-50 h-[160px] w-fit flex items-center justify-center border border-gray-100">
                                            <ImageWithFallback
                                                src={item.heroImage}
                                                alt={item.title}
                                                width={320}
                                                height={160}
                                                className="h-full w-auto object-contain p-2"
                                            />
                                        </div>
                                    )}

                                    <div className="prose prose-slate text-slate-600 max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: item.body }} />
                                    </div>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>

                {sortedNews.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-sm">
                        <Info className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">Momentan gibt es keine News.</p>
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <ProjectCTA variant="light" />
        </div>
    );
}
