import { getSiteSettings } from "@/lib/cms";

const BASE_URL = "https://elektro-tel.ch";

type ServiceSchemaProps = {
    service: {
        title: string;
        slug: string;
        description?: string;
    };
    areaServed?: string[];
};

export function ServiceSchema({ service, areaServed }: ServiceSchemaProps) {
    const settings = getSiteSettings();
    const mainLocation = settings?.locations?.[0];
    const parsePostalCode = (city?: string) => {
        if (!city) return undefined;
        const match = city.match(/\b\d{4,5}\b/);
        return match ? match[0] : undefined;
    };
    const fallbackAreas = ["Winterthur", "Tägerwilen", "Schaffhausen"];
    const resolvedAreas = areaServed ?? settings?.locations?.map((loc) => loc.name) ?? fallbackAreas;
    const uniqueAreas = Array.from(new Set(resolvedAreas));

    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.description,
        keywords: [service.title, ...uniqueAreas].join(", "),
        provider: {
            "@type": "LocalBusiness",
            name: "Elektro-Tel AG",
            url: BASE_URL,
            address: mainLocation
                ? {
                    "@type": "PostalAddress",
                    "streetAddress": mainLocation.street,
                    "addressLocality": mainLocation.city,
                    "postalCode": parsePostalCode(mainLocation.city),
                    "addressCountry": "CH"
                }
                : undefined,
        },
        areaServed: uniqueAreas.map((area) => ({
            "@type": "Place",
            name: area,
        })),
        url: `${BASE_URL}/leistungen/${service.slug}`,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
