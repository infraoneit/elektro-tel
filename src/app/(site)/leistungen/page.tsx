import { getPageContent } from "@/lib/cms";
import { SectionRenderer } from "@/components/SectionRenderer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
    FileText, Zap, Wrench, Cpu, Wifi, ShieldAlert, Lightbulb, Sun, Car,
    CheckCircle2, ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
    title: "Leistungen | Elektro-Tel",
    description: "Unsere Dienstleistungen. Elektrotechnik, Gebäudeautomation, IT & Telekommunikation.",
};

const detailedServices = [
    {
        id: "elektroplanung",
        title: "Elektroplanung",
        icon: FileText,
        description: "Wir planen Ihre Elektroinstallationen professionell und zukunftssicher. Von der ersten Idee bis zum Ausführungsplan begleiten wir Sie durch alle Phasen Ihres Projekts.",
        details: [
            "Bedürfnisaufnahme und Machbarkeitsstudien",
            "Erstellung von Pflichtenheften",
            "CAD- und Schema-Planung",
            "Revisionsunterlagen und Dokumentation",
            "Koordination mit Architekten und Fachplanern"
        ],
        targetGroup: "Ideal für Architekten, Bauherren und Generalunternehmer.",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        id: "stark-schwachstrom",
        title: "Stark- & Schwachstrom",
        icon: Zap,
        description: "Die klassische Elektroinstallation in höchster Qualität. Wir sorgen dafür, dass Energie sicher und zuverlässig dort fliesst, wo Sie sie brauchen.",
        details: [
            "Licht- und Kraftinstallationen im Wohnungsbau",
            "Industrie- und Gewerbeinstallationen",
            "Multimediaverkabelungen (TV/Audio)",
            "Gegensprechanlagen und Zutrittssysteme",
            "Universelle Gebäudeverkabelung (UKV)"
        ],
        targetGroup: "Für Neubauten, Umbauten und Renovationen jeder Grösse.",
        color: "text-amber-500",
        bg: "bg-amber-50"
    },
    {
        id: "service-unterhalt",
        title: "Service & Unterhalt",
        icon: Wrench,
        description: "Anlagen müssen gewartet werden, um sicher zu funktionieren. Unser Service-Team ist für Sie da – schnell, kompetent und zuverlässig.",
        details: [
            "24/7 Störungsbehebung und Pikettdienst",
            "Regelmässige Wartungsarbeiten",
            "Sicherheitsnachweise (SiNa) und Kontrollen",
            "Kleininstallationen und Reparaturen",
            "Geräteanschlüsse und -austausch"
        ],
        targetGroup: "Privatkunden, Verwaltungen und Unternehmen.",
        color: "text-brand-red",
        bg: "bg-red-50"
    },
    {
        id: "gebaudeautomation",
        title: "Gebäudeautomation",
        icon: Cpu,
        description: "Mehr Komfort, Sicherheit und Energieeffizienz durch intelligente Steuerung. Wir vernetzen Ihr Gebäude für die Zukunft.",
        details: [
            "Smart Home Lösungen (KNX, Loxone, etc.)",
            "Zentrale Licht- und Storensteuerung",
            "Einzelraumregulierung für Heizung/Klima",
            "Visualisierung auf Tablet und Smartphone",
            "Fernzugriff und Monitoring"
        ],
        targetGroup: "Für alle, die modern und effizient wohnen oder arbeiten wollen.",
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
    {
        id: "telefonie-internet",
        title: "Telefonie und Internet",
        icon: Wifi,
        description: "Moderne Kommunikationslösungen sind das Rückgrat jedes Unternehmens und Haushalts. Wir bringen Sie ans Netz.",
        details: [
            "Planung und Installation von Netzwerken (LAN/WLAN)",
            "Glasfaserinstallationen (FTTH/Inhouse)",
            "VoIP Telefonanlagen für Unternehmen",
            "WLAN-Ausleuchtung und Optimierung",
            "Serverraum-Infrastruktur"
        ],
        targetGroup: "Büros, KMU, Industrie und Heimnetzwerke.",
        color: "text-cyan-600",
        bg: "bg-cyan-50"
    },
    {
        id: "sicherheit",
        title: "Sicherheit",
        icon: ShieldAlert,
        description: "Schützen Sie was Ihnen lieb ist. Wir bieten massgeschneiderte Sicherheitskonzepte für Personen und Sachwerte.",
        details: [
            "Einbruchmeldeanlagen und Alarmsysteme",
            "Videoüberwachung (CCTV)",
            "Zutrittskontrollsysteme",
            "Brandmeldeanlagen (in Kooperation)",
            "Notbeleuchtungsanlagen"
        ],
        targetGroup: "Geschäftsliegenschaften, Einzelhandel und Privathäuser.",
        color: "text-slate-700",
        bg: "bg-slate-100"
    },
    {
        id: "beleuchtung",
        title: "Beleuchtung",
        icon: Lightbulb,
        description: "Licht schafft Atmosphäre und Wohlbefinden. Wir setzen Ihre Räume mit innovativen Lichtkonzepten perfekt in Szene.",
        details: [
            "Lichtplanung und Beratung",
            "Umrüstung auf effiziente LED-Technik",
            "Installation von Designleuchten",
            "Intelligente Lichtsteuerung (DALI)",
            "Aussen- und Gartenbeleuchtung"
        ],
        targetGroup: "Wohnraum, Büro, Shop-Design und Aussenbereiche.",
        color: "text-yellow-500",
        bg: "bg-yellow-50"
    },
    {
        id: "photovoltaik",
        title: "Photovoltaik",
        icon: Sun,
        description: "Produzieren Sie Ihren eigenen Strom. Nachhaltig, unabhängig und wirtschaftlich sinnvoll.",
        details: [
            "Beratung und Machbarkeitsprüfung",
            "Installation von PV-Anlagen (Dach/Fassade)",
            "Batteriespeicher-Lösungen",
            "Eigenverbrauchsoptimierung",
            "Monitoring und Unterhalt"
        ],
        targetGroup: "Hausbesitzer, Gewerbe und Landwirtschaft.",
        color: "text-orange-500",
        bg: "bg-orange-50"
    },
    {
        id: "e-mobilitaet",
        title: "E-Mobilität",
        icon: Car,
        description: "Die Zukunft fährt elektrisch. Wir schaffen die nötige Ladeinfrastruktur für Ihre Mobilität.",
        details: [
            "Wallboxen für Einfamilienhäuser",
            "Intelligentes Lastmanagement für Tiefgaragen",
            "Abrechnungssysteme für Mehrparteien",
            "Öffentliche Ladestationen",
            "Netzanalysen und Anschlussgesuche"
        ],
        targetGroup: "Mieter, Eigentümer, Verwaltungen und Unternehmen.",
        color: "text-green-600",
        bg: "bg-green-50"
    }
];

export default function LeistungenPage() {
    const page = getPageContent("leistungen");
    if (!page) notFound();

    return (
        <div className="bg-white">
            {/* Header */}
            <div className="bg-slate-900 text-white py-14 md:py-20 mt-20 md:mt-24">
                <div className="container mx-auto px-4 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">{page.title || "Dienstleistungen"}</h1>
                    <p className="text-xl text-slate-300 max-w-2xl">
                        {page.seoDescription || "Ihr Partner für Elektroplanung, Installation, Telekommunikation und Photovoltaik."}
                    </p>
                </div>
            </div>

            {/* Optional CMS Blocks (like hero images if any, though usually on this page we just have the list) */}
            {page.blocks && page.blocks.length > 0 && (
                <SectionRenderer blocks={page.blocks} />
            )}

            {/* Main Service List */}
            <div className="container mx-auto px-4 py-16 space-y-24">
                {detailedServices.map((service, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <section
                            key={service.id}
                            id={service.id}
                            className="scroll-mt-32 grid md:grid-cols-12 gap-8 md:gap-16 items-start"
                        >
                            {/* Icon / Image Area */}
                            <div className={`md:col-span-4 ${!isEven ? 'md:order-2' : ''}`}>
                                <div className={`p-8 rounded-sm ${service.bg} border-l-4 ${service.color.replace('text-', 'border-')} h-full flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow`}>
                                    <service.icon className={`w-20 h-20 mb-6 ${service.color}`} strokeWidth={1.5} />
                                    <h3 className={`text-2xl font-bold uppercase ${service.color} mb-2`}>{service.title}</h3>
                                    <p className="text-slate-500 text-sm italic">{service.targetGroup}</p>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className={`md:col-span-8 ${!isEven ? 'md:order-1' : ''}`}>
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    {service.title}
                                    <div className="h-1 w-12 bg-brand-red rounded-full ml-2 hidden md:block"></div>
                                </h2>
                                <p className="text-lg text-slate-700 leading-relaxed mb-8">
                                    {service.description}
                                </p>

                                <div className="bg-gray-50 p-6 rounded-sm border border-gray-100">
                                    <h4 className="font-bold uppercase text-sm text-slate-900 mb-4 flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-brand-red" />
                                        Unsere Leistungen
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {service.details.map((detail, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                                                <span className="text-slate-700">{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* CTA Section */}
            <div className="bg-slate-900 text-white py-16 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold uppercase mb-6">Haben Sie ein Projekt?</h2>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        Wir beraten Sie gerne unverbindlich. Kontaktieren Sie uns für eine Offerte oder ein persönliches Gespräch.
                    </p>
                    <a
                        href="/kontakt"
                        className="inline-block bg-brand-red text-white font-bold uppercase px-8 py-4 rounded-sm hover:bg-white hover:text-brand-red transition-all shadow-lg"
                    >
                        Kontakt aufnehmen
                    </a>
                </div>
            </div>
        </div>
    );
}
