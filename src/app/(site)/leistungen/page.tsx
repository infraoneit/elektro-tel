import { getPageContent, getAllServices } from "@/lib/cms";
import { Metadata } from "next";
import { ServicesPageContent } from "@/components/ServicesPageContent";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { OfferCatalogSchema } from "@/components/OfferCatalogSchema";
import { buildAlternates } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Leistungen | Elektro-Tel",
    description: "Unsere Dienstleistungen: Elektrotechnik, Gebäudeautomation, IT und Telekommunikation.",
    alternates: buildAlternates("/leistungen"),
};

export default function LeistungenPage() {
    const page = getPageContent("leistungen");
    const services = getAllServices();

    // Map services to the format expected by ServicesPageContent
    const mappedServices = services.map((service: any) => ({
        slug: service.slug,
        title: service.title,
        icon: service.icon || 'FileText',
        description: service.description || '',
        color: service.color || 'text-blue-600',
        bg: service.bg || 'bg-blue-50',
    }));

    return (
        <>
            <BreadcrumbSchema items={[
                { name: "Startseite", url: "/" },
                { name: "Leistungen", url: "/leistungen" }
            ]} />
            <OfferCatalogSchema />
            <ServicesPageContent
                title={page?.title}
                description={page?.seoDescription}
                services={mappedServices}
            />
        </>
    );
}
