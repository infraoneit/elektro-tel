import { getAllServices, getSiteSettings } from "@/lib/cms";

const BASE_URL = "https://elektro-tel.ch";

export function JsonLd() {
    const settings = getSiteSettings();
    const services = getAllServices();
    const locations = settings?.locations || [];
    const mainLocation = locations[0];

    const parsePostalCode = (city?: string) => {
        if (!city) return undefined;
        const match = city.match(/\b\d{4,5}\b/);
        return match ? match[0] : undefined;
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "Electrician",
        "name": settings?.companyName || "Elektro-Tel AG",
        "url": BASE_URL,
        "logo": `${BASE_URL}/images/logo-elektro-tel-ag.svg`,
        "image": `${BASE_URL}/images/smart-home-elektroinstallation-gebaeudeautomation-elektro-tel-schweiz.webp`,
        "telephone": settings?.phone || "0800 800 813",
        "email": settings?.email || "info@elektro-tel.ch",
        "address": mainLocation
            ? {
                "@type": "PostalAddress",
                "streetAddress": mainLocation.street,
                "addressLocality": mainLocation.city,
                "postalCode": parsePostalCode(mainLocation.city),
                "addressCountry": "CH"
            }
            : undefined,
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "07:30",
                "closes": "12:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "13:30",
                "closes": "17:00"
            }
        ],
        "sameAs": [
            settings?.socialLinks?.facebook,
            settings?.socialLinks?.instagram,
            settings?.socialLinks?.linkedin
        ].filter(Boolean),
        "subOrganization": locations.slice(1).map((loc) => ({
            "@type": "Electrician",
            "name": `${settings?.companyName || "Elektro-Tel AG"} (${loc.name})`,
            "url": BASE_URL,
            "telephone": settings?.phone || "0800 800 813",
            "image": `${BASE_URL}/images/smart-home-elektroinstallation-gebaeudeautomation-elektro-tel-schweiz.webp`,
            "parentOrganization": {
                "@type": "Organization",
                "name": settings?.companyName || "Elektro-Tel AG"
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": loc.street,
                "addressLocality": loc.city,
                "postalCode": parsePostalCode(loc.city),
                "addressCountry": "CH"
            }
        })),
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dienstleistungen",
            "itemListElement": services.map((service: any) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": service.title,
                    "url": `${BASE_URL}/leistungen/${service.slug}`
                }
            }))
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
