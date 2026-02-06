// @ts-nocheck
import { config, fields, collection, singleton } from '@keystatic/core';

// --- CONFIGURATION ---
// Set to true for local development (Local File System)
// Set to false for production (GitHub Integration)
const FORCE_LOCAL_MODE = false;

export default config({
    storage: FORCE_LOCAL_MODE
        ? { kind: 'local' }
        : {
            kind: 'github',
            repo: 'infraoneit/elektro-tel',
        },
    singletons: {
        // ============================================
        // SITE SETTINGS - Header, Footer, Global Data
        // ============================================
        siteSettings: singleton({
            label: 'Website Einstellungen',
            path: 'content/settings/site',
            format: { data: 'yaml' },
            schema: {
                companyName: fields.text({ label: 'Firmenname', defaultValue: 'Elektro-Tel AG' }),
                phone: fields.text({ label: 'Telefonnummer', defaultValue: '0800 800 813' }),
                email: fields.text({ label: 'E-Mail', defaultValue: 'info@elektro-tel.ch' }),
                whatsapp: fields.text({ label: 'WhatsApp Nummer', defaultValue: '+41763145553' }),
                footerText: fields.text({
                    label: 'Footer Text',
                    multiline: true,
                    defaultValue: 'Ihr kompetenter Partner für sämtliche Elektro- und Telekommunikationsinstallationen.'
                }),
                socialLinks: fields.object({
                    facebook: fields.text({ label: 'Facebook URL' }),
                    instagram: fields.text({ label: 'Instagram URL' }),
                    linkedin: fields.text({ label: 'LinkedIn URL' }),
                }, { label: 'Social Media Links' }),
                locations: fields.array(
                    fields.object({
                        name: fields.text({ label: 'Standort Name' }),
                        street: fields.text({ label: 'Strasse' }),
                        city: fields.text({ label: 'PLZ & Ort' }),
                        mapsUrl: fields.text({ label: 'Google Maps URL' }),
                    }),
                    { label: 'Standorte', itemLabel: (props) => props.fields.name.value || 'Standort' }
                ),
            },
        }),
        // ============================================
        // NAVIGATION (Header & Footer Menus)
        // ============================================
        navigation: singleton({
            label: 'Navigation (Header & Footer)',
            path: 'content/settings/navigation',
            format: { data: 'yaml' },
            schema: {
                headerMenu: fields.array(
                    fields.object({
                        name: fields.text({ label: 'Menüpunkt-Name' }),
                        href: fields.text({ label: 'Link-URL' }),
                        hasSubmenu: fields.checkbox({ label: 'Hat Untermenü', defaultValue: false }),
                        submenu: fields.array(
                            fields.object({
                                name: fields.text({ label: 'Untermenü-Name' }),
                                href: fields.text({ label: 'Untermenü-URL' }),
                            }),
                            { label: 'Untermenü-Einträge', itemLabel: (props) => props.fields.name.value || 'Eintrag' }
                        ),
                    }),
                    { label: 'Header-Menü', itemLabel: (props) => props.fields.name.value || 'Menüpunkt' }
                ),
                footerMenu: fields.array(
                    fields.object({
                        name: fields.text({ label: 'Menüpunkt-Name' }),
                        href: fields.text({ label: 'Link-URL' }),
                    }),
                    { label: 'Footer-Menü', itemLabel: (props) => props.fields.name.value || 'Menüpunkt' }
                ),
            },
        }),
        // ============================================
        // HOMEPAGE SERVICES (Independent tiles)
        // ============================================
        homepageServices: singleton({
            label: 'Dienstleistungen (Startseite)',
            path: 'content/settings/homepage-services',
            format: { data: 'yaml' },
            schema: {
                title: fields.text({ label: 'Überschrift', defaultValue: 'UNSERE LEISTUNGEN' }),
                items: fields.array(
                    fields.object({
                        title: fields.text({ label: 'Titel' }),
                        description: fields.text({ label: 'Beschreibung', multiline: true }),
                        icon: fields.select({
                            label: 'Icon',
                            options: [
                                { label: 'Dokument', value: 'FileText' },
                                { label: 'Blitz', value: 'Zap' },
                                { label: 'Werkzeug', value: 'Wrench' },
                                { label: 'CPU', value: 'Cpu' },
                                { label: 'WLAN', value: 'Wifi' },
                                { label: 'Schild', value: 'ShieldAlert' },
                                { label: 'Glühbirne', value: 'Lightbulb' },
                                { label: 'Sonne', value: 'Sun' },
                                { label: 'Auto', value: 'Car' },
                                { label: 'Telefon', value: 'Phone' },
                            ],
                            defaultValue: 'Zap',
                        }),
                        linkUrl: fields.text({ label: 'Link-URL (optional)' }),
                    }),
                    { label: 'Dienstleistungs-Kacheln', itemLabel: (props) => props.fields.title.value || 'Kachel' }
                ),
            },
        }),
        // ============================================
        // CONTACT PAGE SETTINGS
        // ============================================
        contactSettings: singleton({
            label: 'Kontakt-Seite',
            path: 'content/settings/contact',
            format: { data: 'yaml' },
            schema: {
                pageTitle: fields.text({ label: 'Seiten-Titel', defaultValue: 'Kontakt' }),
                pageSubtitle: fields.text({ label: 'Untertitel', multiline: true }),
                locationsTitle: fields.text({ label: 'Standorte-Überschrift' }),
                ctaTitle: fields.text({ label: 'CTA-Überschrift' }),
                ctaText: fields.text({ label: 'CTA-Text', multiline: true }),
                ctaPhone: fields.text({ label: 'Telefonnummer' }),
                formTitle: fields.text({ label: 'Formular-Überschrift' }),
            },
        }),
        // ============================================
        // HERO SETTINGS (Homepage)
        // ============================================
        heroSettings: singleton({
            label: 'Hero-Bereich (Startseite)',
            path: 'content/settings/hero',
            format: { data: 'yaml' },
            schema: {
                title: fields.text({ label: 'Titel' }),
                subtitle: fields.text({ label: 'Untertitel' }),
                image: fields.image({
                    label: 'Hintergrundbild',
                    directory: 'public/images',
                    publicPath: '/images/',
                }),
                banners: fields.array(
                    fields.object({
                        label: fields.text({ label: 'Kleiner Text oben' }),
                        title: fields.text({ label: 'Titel' }),
                        description: fields.text({ label: 'Beschreibung' }),
                        linkText: fields.text({ label: 'Link-Text', defaultValue: 'Mehr erfahren' }),
                        linkUrl: fields.text({ label: 'Link-URL' }),
                        icon: fields.select({
                            label: 'Icon',
                            options: [
                                { label: 'Sonne', value: 'Sun' },
                                { label: 'Auto (E-Mobilität)', value: 'Car' },
                                { label: 'Blitz', value: 'Zap' },
                                { label: 'Schild', value: 'ShieldAlert' },
                                { label: 'Glühbirne', value: 'Lightbulb' },
                                { label: 'CPU', value: 'Cpu' },
                                { label: 'Telefon', value: 'Phone' },
                            ],
                            defaultValue: 'Sun',
                        }),
                        gradientFrom: fields.select({
                            label: 'Gradient-Farbe von',
                            options: [
                                { label: '🟠 Orange', value: 'orange-500' },
                                { label: '🟡 Gelb', value: 'yellow-500' },
                                { label: '🔵 Blau', value: 'blue-500' },
                                { label: '🩵 Cyan', value: 'cyan-500' },
                                { label: '🟢 Grün', value: 'green-500' },
                                { label: '🌿 Smaragd', value: 'emerald-500' },
                                { label: '🔴 Rot', value: 'red-500' },
                                { label: '🟣 Lila', value: 'purple-500' },
                                { label: '💜 Indigo', value: 'indigo-500' },
                                { label: '🩷 Rosa', value: 'pink-500' },
                                { label: '⬛ Schiefer', value: 'slate-700' },
                            ],
                            defaultValue: 'orange-500',
                        }),
                        gradientTo: fields.select({
                            label: 'Gradient-Farbe bis',
                            options: [
                                { label: '🟠 Orange', value: 'orange-500' },
                                { label: '🟡 Gelb', value: 'yellow-500' },
                                { label: '🔵 Blau', value: 'blue-500' },
                                { label: '🩵 Cyan', value: 'cyan-500' },
                                { label: '🟢 Grün', value: 'green-500' },
                                { label: '🌿 Smaragd', value: 'emerald-500' },
                                { label: '🔴 Rot', value: 'red-500' },
                                { label: '🟣 Lila', value: 'purple-500' },
                                { label: '💜 Indigo', value: 'indigo-500' },
                                { label: '🩷 Rosa', value: 'pink-500' },
                                { label: '⬛ Schiefer', value: 'slate-700' },
                            ],
                            defaultValue: 'yellow-500',
                        }),
                    }),
                    {
                        label: 'Highlight-Kacheln (max. 2)',
                        itemLabel: (props) => props.fields.title.value || 'Kachel',
                    }
                ),
            },
        }),
        // ============================================
        // ABOUT SETTINGS (Homepage "Wer wir sind")
        // ============================================
        aboutSettings: singleton({
            label: 'Wer Wir Sind (Startseite)',
            path: 'content/settings/about',
            format: { data: 'yaml' },
            schema: {
                title: fields.text({ label: 'Titel' }),
                image: fields.image({
                    label: 'Bild',
                    directory: 'public/images',
                    publicPath: '/images/',
                }),
                body: fields.text({ label: 'Text', multiline: true }),
            },
        }),
        // ============================================
        // SERVICES HERO SETTINGS (Leistungen-Übersicht)
        // ============================================
        servicesHeroSettings: singleton({
            label: 'Hero-Bereich (Leistungen)',
            path: 'content/settings/services-hero',
            format: { data: 'yaml' },
            schema: {
                title: fields.text({ label: 'Titel' }),
                description: fields.text({ label: 'Beschreibung', multiline: true }),
            },
        }),
        // ============================================
        // TEAM EXPERIENCE SETTINGS (50 Jahre)
        // ============================================
        teamExperienceSettings: singleton({
            label: '50 Jahre Erfahrung (Team)',
            path: 'content/settings/team-experience',
            format: { data: 'yaml' },
            schema: {
                title: fields.text({ label: 'Titel' }),
                image: fields.image({
                    label: 'Bild',
                    directory: 'public/images',
                    publicPath: '/images/',
                }),
                body: fields.text({ label: 'Text', multiline: true }),
            },
        }),
        // ============================================
        // TEAM MEMBERS (Grouped by Department)
        // ============================================
        teamMembers: singleton({
            label: 'Team-Mitglieder',
            path: 'content/settings/team-members',
            format: { data: 'yaml' },
            schema: {
                management: fields.array(
                    fields.object({
                        name: fields.text({ label: 'Name', validation: { isRequired: true } }),
                        position: fields.text({ label: 'Position', validation: { isRequired: true } }),
                        jobTitle: fields.text({ label: 'Job Title (optional)' }),
                        email: fields.text({ label: 'E-Mail (optional)' }),
                        image: fields.image({
                            label: 'Foto',
                            directory: 'public/images/team',
                            publicPath: '/images/team/',
                        }),
                        showOnHomepage: fields.checkbox({
                            label: 'Auf Startseite anzeigen',
                            defaultValue: true,
                        }),
                    }),
                    {
                        label: 'Geschäftsleitung',
                        itemLabel: (props) => props.fields.name.value || 'Neues Mitglied',
                    }
                ),
                project: fields.array(
                    fields.object({
                        name: fields.text({ label: 'Name', validation: { isRequired: true } }),
                        position: fields.text({ label: 'Position', validation: { isRequired: true } }),
                        jobTitle: fields.text({ label: 'Job Title (optional)' }),
                        email: fields.text({ label: 'E-Mail (optional)' }),
                        image: fields.image({
                            label: 'Foto',
                            directory: 'public/images/team',
                            publicPath: '/images/team/',
                        }),
                        showOnHomepage: fields.checkbox({
                            label: 'Auf Startseite anzeigen',
                            defaultValue: true,
                        }),
                    }),
                    {
                        label: 'Projektleitung',
                        itemLabel: (props) => props.fields.name.value || 'Neues Mitglied',
                    }
                ),
                administration: fields.array(
                    fields.object({
                        name: fields.text({ label: 'Name', validation: { isRequired: true } }),
                        position: fields.text({ label: 'Position', validation: { isRequired: true } }),
                        jobTitle: fields.text({ label: 'Job Title (optional)' }),
                        email: fields.text({ label: 'E-Mail (optional)' }),
                        image: fields.image({
                            label: 'Foto',
                            directory: 'public/images/team',
                            publicPath: '/images/team/',
                        }),
                        showOnHomepage: fields.checkbox({
                            label: 'Auf Startseite anzeigen',
                            defaultValue: true,
                        }),
                    }),
                    {
                        label: 'Administration',
                        itemLabel: (props) => props.fields.name.value || 'Neues Mitglied',
                    }
                ),
            },
        }),
    },
    collections: {
        // ============================================
        // SERVICES (NEW)
        // ============================================
        services: collection({
            label: 'Dienstleistungen',
            slugField: 'title',
            path: 'content/services/*',
            format: { contentField: 'body' },
            schema: {
                title: fields.slug({ name: { label: 'Titel' } }),
                seoTitle: fields.text({ label: 'SEO Titel' }),
                seoDescription: fields.text({ label: 'SEO Beschreibung', multiline: true }),
                heroImage: fields.image({
                    label: 'Hero Bild',
                    directory: 'public/images/services',
                    publicPath: '/images/services/',
                }),
                icon: fields.select({
                    label: 'Icon',
                    options: [
                        { label: 'Dokument (Planung)', value: 'FileText' },
                        { label: 'Blitz (Strom)', value: 'Zap' },
                        { label: 'Werkzeug (Service)', value: 'Wrench' },
                        { label: 'CPU (Automation)', value: 'Cpu' },
                        { label: 'WiFi (Internet)', value: 'Wifi' },
                        { label: 'Schild (Sicherheit)', value: 'ShieldAlert' },
                        { label: 'Glühbirne (Beleuchtung)', value: 'Lightbulb' },
                        { label: 'Sonne (Photovoltaik)', value: 'Sun' },
                        { label: 'Auto (E-Mobilität)', value: 'Car' },
                    ],
                    defaultValue: 'FileText',
                }),
                color: fields.select({
                    label: 'Icon Farbe',
                    options: [
                        { label: 'Blau', value: 'text-blue-600' },
                        { label: 'Gelb/Orange', value: 'text-amber-500' },
                        { label: 'Rot', value: 'text-brand-red' },
                        { label: 'Lila', value: 'text-purple-600' },
                        { label: 'Cyan', value: 'text-cyan-600' },
                        { label: 'Grau', value: 'text-slate-700' },
                        { label: 'Gelb', value: 'text-yellow-500' },
                        { label: 'Orange', value: 'text-orange-500' },
                        { label: 'Grün', value: 'text-green-600' },
                    ],
                    defaultValue: 'text-blue-600',
                }),
                bg: fields.select({
                    label: 'Hintergrundfarbe',
                    options: [
                        { label: 'Blau', value: 'bg-blue-50' },
                        { label: 'Gelb/Orange', value: 'bg-amber-50' },
                        { label: 'Rot', value: 'bg-red-50' },
                        { label: 'Lila', value: 'bg-purple-50' },
                        { label: 'Cyan', value: 'bg-cyan-50' },
                        { label: 'Grau', value: 'bg-slate-100' },
                        { label: 'Gelb', value: 'bg-yellow-50' },
                        { label: 'Orange', value: 'bg-orange-50' },
                        { label: 'Grün', value: 'bg-green-50' },
                    ],
                    defaultValue: 'bg-blue-50',
                }),
                description: fields.text({ label: 'Kurzbeschreibung (für Kachel)', multiline: true }),
                targetGroup: fields.text({ label: 'Zielgruppe' }),
                pdfDownload: fields.text({
                    label: 'PDF Download Link',
                    description: 'Pfad zur PDF-Datei z.B. /pdf/dokument.pdf'
                }),
                details: fields.array(
                    fields.text({ label: 'Detail' }),
                    { label: 'Leistungen (Bullet Points)', itemLabel: (props) => props.value || 'Detail' }
                ),
                body: fields.markdoc({
                    label: 'Detaillierter Inhalt',
                    extension: 'md',
                    options: {
                        image: {
                            directory: 'public/images/services',
                            publicPath: '/images/services/',
                        },
                    },
                }),
            },
        }),
        // ============================================
        // QUALITY & SUSTAINABILITY PAGES
        // ============================================
        quality: collection({
            label: 'Qualität & Nachhaltigkeit',
            slugField: 'title',
            path: 'content/quality/*',
            format: { contentField: 'body' },
            schema: {
                title: fields.slug({ name: { label: 'Titel' } }),
                seoTitle: fields.text({ label: 'SEO Titel' }),
                seoDescription: fields.text({ label: 'SEO Beschreibung', multiline: true }),
                icon: fields.select({
                    label: 'Icon',
                    options: [
                        { label: 'Schild (Qualität)', value: 'ShieldCheck' },
                        { label: 'Blatt (Nachhaltigkeit)', value: 'Leaf' },
                        { label: 'Recycling (Abfall)', value: 'Recycle' },
                    ],
                    defaultValue: 'ShieldCheck',
                }),
                color: fields.select({
                    label: 'Icon Farbe',
                    options: [
                        { label: 'Grün', value: 'text-green-600' },
                        { label: 'Smaragd', value: 'text-emerald-600' },
                        { label: 'Türkis', value: 'text-teal-600' },
                    ],
                    defaultValue: 'text-green-600',
                }),
                bg: fields.select({
                    label: 'Hintergrundfarbe',
                    options: [
                        { label: 'Grün', value: 'bg-green-50' },
                        { label: 'Smaragd', value: 'bg-emerald-50' },
                        { label: 'Türkis', value: 'bg-teal-50' },
                    ],
                    defaultValue: 'bg-green-50',
                }),
                description: fields.text({ label: 'Kurzbeschreibung', multiline: true }),
                pdfDownload: fields.text({
                    label: 'PDF Download Link',
                    description: 'Pfad zur PDF-Datei z.B. /pdf/dokument.pdf'
                }),
                details: fields.array(
                    fields.text({ label: 'Kernpunkt' }),
                    { label: 'Kernpunkte (Bullet Points)', itemLabel: (props) => props.value || 'Punkt' }
                ),
                body: fields.markdoc({
                    label: 'Detaillierter Inhalt',
                    extension: 'md',
                }),
            },
        }),
        // ============================================
        // EXISTING COLLECTIONS (UNCHANGED)
        // ============================================
        help: collection({
            label: 'Anleitungen',
            slugField: 'title',
            path: 'content/help/*',
            format: { contentField: 'body' },
            schema: {
                title: fields.slug({ name: { label: 'Titel' } }),
                body: fields.markdoc({
                    label: 'Anleitung',
                    description: 'Hier finden Sie Hinweise zur Bedienung.',
                    extension: 'md',
                }),
            },
        }),
        // @ts-ignore
        news: collection({
            label: 'News',
            slugField: 'title',
            path: 'content/news/*',
            format: { contentField: 'body' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                heroImage: fields.image({
                    label: 'Hero Image',
                    directory: 'public/images/news',
                    publicPath: '/images/news/',
                }),
                icon: fields.select({
                    label: 'Icon',
                    description: 'Select an icon to display if no image is provided',
                    options: [
                        { label: 'Newspaper (Default)', value: 'Newspaper' },
                        { label: 'Trophy (Awards)', value: 'Trophy' },
                        { label: 'Phone (Service)', value: 'Phone' },
                        { label: 'Handshake (Partnership)', value: 'Handshake' },
                        { label: 'Wrench (Technical)', value: 'Wrench' },
                        { label: 'Shield (Security)', value: 'ShieldCheck' },
                        { label: 'Info (General)', value: 'Info' },
                    ],
                    defaultValue: 'Newspaper',
                }),
                date: fields.date({ label: 'Date', validation: { isRequired: true }, defaultValue: { kind: 'today' } }),
                intro: fields.text({ label: 'Intro Text' }),
                body: fields.markdoc({
                    label: 'Content (Markdown)',
                    extension: 'md',
                    options: {
                        image: {
                            directory: 'public/images/news/inline',
                            publicPath: '/images/news/inline/',
                        },
                    },
                }),
            },
        }),
        // @ts-ignore
        references: collection({
            label: 'Referenzen',
            slugField: 'title',
            path: 'content/references/*',
            format: { contentField: 'body' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                date: fields.date({ label: 'Date', validation: { isRequired: true }, defaultValue: { kind: 'today' } }),
                order: fields.number({ label: 'Manual Sort Order' }),
                category: fields.text({ label: 'Category' }),
                address: fields.text({ label: 'Address' }),
                client: fields.text({ label: 'Client' }),
                architect: fields.text({ label: 'Architect' }),
                works: fields.text({ label: 'Works Performed' }),
                image: fields.image({
                    label: 'Image (Upload)',
                    directory: 'public/images/references',
                    publicPath: '/images/references/',
                }),
                heroImage: fields.text({ label: 'Hero Image Path' }),
                body: fields.markdoc({ label: 'Content (Markdown)', extension: 'md' }),
            },
        }),
        // @ts-ignore
        jobs: collection({
            label: 'Jobs',
            slugField: 'title',
            path: 'content/jobs/*',
            format: { contentField: 'body' },
            schema: {
                title: fields.slug({ name: { label: 'Job Title' } }),
                slug: fields.text({ label: 'Slug (Optional)' }),
                date: fields.date({ label: 'Date', validation: { isRequired: true }, defaultValue: { kind: 'today' } }),
                location: fields.text({ label: 'Location' }),
                intro: fields.text({ label: 'Intro' }),
                applyContact: fields.text({ label: 'Apply Email' }),
                body: fields.markdoc({ label: 'Content (Markdown)', extension: 'md' }),
            },
        }),
        // @ts-ignore
        partners: collection({
            label: 'Partners',
            slugField: 'title',
            path: 'content/partners/*',
            format: { contentField: 'body' },
            schema: {
                title: fields.slug({ name: { label: 'Partner Name' } }),
                url: fields.text({ label: 'Website URL' }),
                logo: fields.image({
                    label: 'Logo',
                    directory: 'public/partners',
                    publicPath: '/partners/',
                }),
                order: fields.number({ label: 'Order' }),
                body: fields.markdoc({ label: 'Description (Markdown)', extension: 'md' }),
            },
        }),
    },
});
