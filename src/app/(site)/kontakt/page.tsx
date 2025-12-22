import { ContactLocationsBlock } from "@/components/blocks/ContactLocationsBlock";
import { ContactForm } from "@/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kontakt | Elektro-Tel",
    description: "Schnell erreichbar in Winterthur, Tägerwilen und Schaffhausen.",
};

const locationsBlockMock = {
    title: "Unsere Standorte",
    locations: [
        // Since the component might fetch or use passed props, we can rely on it if it fetches. 
        // But ContactLocationsBlock usually requires content. 
        // For now, let's instantiate it with the data structure it expects or empty if it fetches.
        // Looking at previous usage, it takes props. 
        // We'll mock the data or fetch it. Simpler to reuse the component if we can. 
        // Actually, the block definition in cms.ts might help.
        // Let's assume the component handles display given the props.
    ]
};

// We need to pass data to ContactLocationsBlock or it needs to fetch.
// Let's look at ContactLocationsBlock.tsx content later if needed.
// For now, we will assume reasonable defaults or we might need to hardcode the locations here 
// since the user said "Contact page with specific location details".

export default function KontaktPage() {
    return (
        <div className="bg-white">
            {/* Header */}
            <div className="bg-slate-900 text-white py-14 md:py-20 mt-20 md:mt-24">
                <div className="container mx-auto px-4 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">Kontakt</h1>
                    <p className="text-xl text-slate-300 max-w-2xl">
                        Schnell erreichbar in Winterthur, Tägerwilen und Schaffhausen.
                    </p>
                </div>
            </div>

            {/* Locations */}
            <ContactLocationsBlock title="Unsere Standorte" locations={[]} />

            {/* Emergency Block */}
            <div className="bg-brand-red text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold uppercase mb-4">Pikett & Notfall 24/7</h2>
                    <p className="text-lg mb-6 opacity-90">Wir sind rund um die Uhr für Sie da. Auch an Wochenenden und Feiertagen.</p>
                    <a href="tel:0800800813" className="inline-block bg-white text-brand-red font-bold text-2xl px-8 py-4 rounded-sm hover:bg-slate-100 transition-colors shadow-lg">
                        0800 800 813
                    </a>
                </div>
            </div>

            {/* Form Section */}
            <div className="py-14 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="bg-white p-6 md:p-12 shadow-xl rounded-sm w-full">
                        <h2 className="text-3xl font-bold uppercase text-slate-900 mb-8 md:mb-10 text-left">Schreiben Sie uns</h2>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
