import { ContactLocationsBlock } from "@/components/blocks/ContactLocationsBlock";
import { ContactForm } from "@/components/ContactForm";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { Metadata } from "next";
import { getContactSettings } from "@/lib/cms";
import { buildAlternates } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Kontakt | Elektro-Tel",
    description: "Kontaktieren Sie Elektro-Tel in Winterthur, Tägerwilen und Schaffhausen.",
    alternates: buildAlternates("/kontakt"),
};

// Default values (fallback if CMS data is unavailable)
const defaults = {
    pageTitle: "Kontakt",
    pageSubtitle: "Schnell erreichbar in Winterthur, Tägerwilen und Schaffhausen.",
    locationsTitle: "Unsere Standorte",
    ctaTitle: "Wir sind für Sie da",
    ctaText: "Haben Sie Fragen oder benötigen Sie einen Termin? Rufen Sie uns an.",
    ctaPhone: "0800 800 813",
    formTitle: "Schreiben Sie uns",
};

export default function KontaktPage() {
    // Fetch settings from CMS with fallbacks
    const settings = getContactSettings();
    const content = {
        pageTitle: settings?.pageTitle || defaults.pageTitle,
        pageSubtitle: settings?.pageSubtitle || defaults.pageSubtitle,
        locationsTitle: settings?.locationsTitle || defaults.locationsTitle,
        ctaTitle: settings?.ctaTitle || defaults.ctaTitle,
        ctaText: settings?.ctaText || defaults.ctaText,
        ctaPhone: settings?.ctaPhone || defaults.ctaPhone,
        formTitle: settings?.formTitle || defaults.formTitle,
    };

    // Format phone for tel: link (remove spaces)
    const phoneLink = content.ctaPhone.replace(/\s/g, '');

    return (
        <div className="bg-white">
            <BreadcrumbSchema items={[
                { name: "Startseite", url: "/" },
                { name: "Kontakt", url: "/kontakt" }
            ]} />
            {/* Header */}
            <div className="bg-slate-900 text-white py-14 md:py-20 mt-20 md:mt-24">
                <div className="container mx-auto px-4 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">{content.pageTitle}</h1>
                    <p className="text-xl text-slate-300 max-w-2xl">
                        {content.pageSubtitle}
                    </p>
                </div>
            </div>

            {/* Locations */}
            <ContactLocationsBlock title={content.locationsTitle} locations={[]} />

            {/* Contact Block */}
            <div className="bg-brand-red text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold uppercase mb-4">{content.ctaTitle}</h2>
                    <p className="text-lg mb-6 opacity-90">{content.ctaText}</p>
                    <a href={`tel:${phoneLink}`} className="inline-block bg-white text-brand-red font-bold text-2xl px-8 py-4 rounded-sm hover:bg-slate-100 transition-colors shadow-lg">
                        {content.ctaPhone}
                    </a>
                </div>
            </div>

            {/* Form Section - Form itself is NOT editable via CMS */}
            <div className="py-14 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="bg-white p-6 md:p-12 shadow-xl rounded-sm w-full">
                        <h2 className="text-3xl font-bold uppercase text-slate-900 mb-8 md:mb-10 text-left">{content.formTitle}</h2>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
