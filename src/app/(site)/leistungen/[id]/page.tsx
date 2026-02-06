import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getServiceById, getAllServices } from "@/lib/cms";
import Image from "next/image";
import Link from "next/link";
import {
    FileText, Zap, Wrench, Cpu, Wifi, ShieldAlert, Lightbulb, Sun, Car,
    CheckCircle2, ArrowLeft, Phone, Mail, MessageCircle, Download
} from "lucide-react";
import { AnimatedContent, AnimatedHero, StaggerContainer, StaggerItem, AnimatedImageWrapper } from "@/components/ui/PageAnimations";
import { ProjectCTA } from "@/components/ProjectCTA";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import { buildAlternates, clampMeta } from "@/lib/seo";

const iconMap: { [key: string]: any } = {
    FileText, Zap, Wrench, Cpu, Wifi, ShieldAlert, Lightbulb, Sun, Car
};

export async function generateStaticParams() {
    const services = getAllServices();
    return services.map((service) => ({ id: service.slug }));
}

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const service = getServiceById(id);
    if (!service) return {};
    return {
        title: clampMeta(service.seoTitle || `${service.title} | Elektro-Tel`, 60),
        description: clampMeta(service.seoDescription || service.description, 155),
        alternates: buildAlternates(`/leistungen/${service.slug}`),
    };
}

export default async function ServiceDetailPage({ params }: Props) {
    const { id } = await params;
    const service = getServiceById(id);

    if (!service) {
        notFound();
    }

    const IconComponent = iconMap[service.icon] || FileText;

    return (
        <div className="bg-white">
            <BreadcrumbSchema items={[
                { name: "Startseite", url: "/" },
                { name: "Leistungen", url: "/leistungen" },
                { name: service.title, url: `/leistungen/${service.slug}` }
            ]} />
            <ServiceSchema service={{ title: service.title, slug: service.slug, description: service.description }} />
            {/* Hero Section - Premium Split Layout */}
            <section className="relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-28 md:pt-32 pb-16 md:pb-0 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                    <div className={`absolute top-20 right-20 w-64 h-64 ${service.bg} opacity-5 rounded-full blur-3xl`} />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center md:min-h-[50vh] lg:min-h-[55vh]">
                        {/* Left Side - Text Content */}
                        <AnimatedHero className="text-white">
                            {/* Breadcrumb */}
                            <Link href="/leistungen" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-10 group transition-colors">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="uppercase tracking-wider">Leistungen</span>
                            </Link>

                            {/* Premium Icon Badge */}
                            <div className="mb-8">
                                <div className={`relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24`}>
                                    {/* Gradient Ring */}
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color.replace('text-', 'from-')}/20 to-transparent`} />
                                    <div className={`absolute inset-[3px] rounded-xl bg-slate-800/90 backdrop-blur-sm`} />
                                    <IconComponent className={`relative w-10 h-10 md:w-12 md:h-12 ${service.color}`} strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Title with Accent Line */}
                            <div className="relative mb-6">
                                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-red via-brand-red to-transparent rounded-full hidden lg:block" />
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]">
                                    {service.title}
                                </h1>
                            </div>

                            {/* Description */}
                            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mb-6 sm:mb-8 md:mb-10">
                                {service.description}
                            </p>

                            {/* Premium CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/kontakt"
                                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-brand-red text-white font-semibold px-5 sm:px-6 md:px-8 py-3 md:py-4 rounded-sm hover:bg-white hover:text-brand-red transition-all duration-300 shadow-lg shadow-brand-red/20 hover:shadow-xl text-sm sm:text-base"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>Beratung anfragen</span>
                                </Link>
                                <a
                                    href="tel:0800800813"
                                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-white/5 text-white font-semibold px-5 sm:px-6 md:px-8 py-3 md:py-4 rounded-sm hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 backdrop-blur-sm text-sm sm:text-base"
                                >
                                    <span className="text-brand-red">✆</span>
                                    <span>0800 800 813</span>
                                    <span className="text-xs text-white/40 ml-1">Gratis</span>
                                </a>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <div className="flex flex-wrap gap-6 text-sm text-white/50">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        <span>Über 50 Jahre Erfahrung</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        <span>Lokaler Partner</span>
                                    </div>
                                </div>
                            </div>
                        </AnimatedHero>

                        {/* Right Side - Image with Ken Burns Effect */}
                        <AnimatedImageWrapper className="hidden md:block relative">
                            <div className="relative h-[350px] md:h-[400px] lg:h-[450px] rounded-xl overflow-hidden group">
                                {/* Decorative Frame */}
                                <div className="absolute -inset-4 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl" />
                                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_35px_70px_-15px_rgba(0,0,0,0.55)]">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={service.heroImage || "/images/elektro-tel-ag-hero-image.webp"}
                                            alt={service.title}
                                            fill
                                            priority
                                            className="object-cover"
                                            sizes="50vw"
                                        />
                                    </div>
                                    {/* Premium Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/20 pointer-events-none" />
                                </div>
                            </div>
                        </AnimatedImageWrapper>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-10 sm:py-12 md:py-16">
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    {/* Left Column - Details */}
                    <div className="md:col-span-2 space-y-12">
                        {/* Service Details */}
                        <AnimatedContent>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-3">
                                Unsere Leistungen
                                <div className="h-1 w-12 bg-brand-red rounded-full"></div>
                            </h2>
                            <div className="grid gap-4">
                                {service.details.map((detail: string, i: number) => (
                                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-sm border-l-4 border-brand-red">
                                        <CheckCircle2 className="w-6 h-6 text-brand-red shrink-0 mt-0.5" />
                                        <span className="text-slate-700 text-lg">{detail}</span>
                                    </div>
                                ))}
                            </div>
                        </AnimatedContent>

                        {/* Extended Content from Markdown */}
                        {service.body && (
                            <AnimatedContent delay={0.1}>
                                <div className="prose prose-lg prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: service.body }} />
                            </AnimatedContent>
                        )}
                    </div>

                    {/* Right Column - Sticky Sidebar */}
                    <AnimatedContent delay={0.2} className="space-y-6 md:sticky md:top-28 md:self-start">
                        {/* Target Group Card */}
                        <div className={`p-6 rounded-sm ${service.bg} border-l-4 ${service.color.replace('text-', 'border-')}`}>
                            <h3 className="font-bold text-slate-900 mb-3">Zielgruppe</h3>
                            <p className="text-slate-700">{service.targetGroup}</p>
                        </div>

                        {/* CTA Card */}
                        <div className="bg-slate-900 text-white p-6 rounded-sm">
                            <h3 className="font-bold text-xl mb-4">Interesse geweckt?</h3>
                            <p className="text-slate-300 mb-6">
                                Wir beraten Sie gerne unverbindlich zu unseren {service.title}-Lösungen.
                            </p>
                            <Link
                                href="/kontakt"
                                className="flex items-center justify-center gap-2 bg-brand-red text-white font-bold uppercase px-6 py-3 rounded-sm hover:bg-white hover:text-brand-red transition-all w-full"
                            >
                                <Phone className="w-5 h-5" />
                                Kontakt aufnehmen
                            </Link>
                        </div>

                        {/* PDF Download Button */}
                        {service.pdfDownload && (
                            <a
                                href={service.pdfDownload}
                                download
                                className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold uppercase px-6 py-4 rounded-sm hover:bg-green-700 transition-all shadow-lg"
                            >
                                <Download className="w-5 h-5" />
                                PDF herunterladen
                            </a>
                        )}

                        {/* Quick Contact */}
                        <div className="border border-gray-200 p-6 rounded-sm">
                            <h3 className="font-bold text-slate-900 mb-4">Schnellkontakt</h3>
                            <div className="space-y-4">
                                <a href="tel:0800800813" className="flex items-center gap-3 text-slate-600 hover:text-brand-red transition-colors">
                                    <Phone className="w-5 h-5 text-brand-red" />
                                    <span>0800 800 813</span>
                                </a>
                                <a href="mailto:info@elektro-tel.ch" className="flex items-center gap-3 text-slate-600 hover:text-brand-red transition-colors">
                                    <Mail className="w-5 h-5 text-brand-red" />
                                    <span>info@elektro-tel.ch</span>
                                </a>
                                <a href="https://wa.me/41763145553" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 hover:text-brand-red transition-colors">
                                    <MessageCircle className="w-5 h-5 text-brand-red" />
                                    <span>WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </div>

            {/* CTA Section */}
            <ProjectCTA variant="light" />
        </div >
    );
}
