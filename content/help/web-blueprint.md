---
title: "Master Website Blueprint (The Bible)"
---
# Master Website Blueprint: Die Elektro-Tel Architektur

> **Version:** 4.0 (The Bible)
> **Autor:** AI Assistant
> **Datum:** 22.12.2025
> **Umfang:** Full Repository Documentation

Dieses Dokument ist die **single source of truth** für die Elektro-Tel Webseite. Es beschreibt jedes Bit und Byte der Architektur. Wenn Sie eine neue Webseite bauen, kopieren Sie nicht nur den Code – verstehen Sie dieses Dokument.

---

## Inhaltsverzeichnis

1.  [Philosophie: Warum Jamstack?](#1-philosophie)
2.  [Projekt Setup (Zero to Hero)](#2-projekt-setup)
3.  [Technischer Stack & Design System](#3-technischer-stack)
4.  [Das Content Management System (Keystatic)](#4-cms)
5.  [Die Data Engine (cms.ts)](#5-data-engine)
6.  [Frontend Architektur: Block Pattern](#6-block-pattern)
7.  [Netlify Forms Integration (Deep Dive)](#7-netlify-forms)
8.  [Deployment Pipeline](#8-deployment)
9.  [Troubleshooting Guide](#9-troubleshooting)

---

<a name="1-philosophie"></a>
## 1. Philosophie: Warum Jamstack?

Diese Webseite ist keine "normale" Webseite. Sie hat keinen Server, keine Datenbank und kein PHP.

### Das Problem traditioneller Seiten (Wordpress)
*   **Sicherheit:** Plugins müssen wöchentlich aktualisiert werden. Ein veraltetes Plugin = gehackte Seite.
*   **Performance:** Jeder Klick startet eine Datenbank-Abfrage. Das ist langsam (TTFB > 500ms).
*   **Kosten:** Man zahlt für Server-Leistung, auch wenn niemand die Seite besucht.

### Die Lösung: Static Site Generation (SSG)
Wir nutzen **Next.js**, um die gesamte Webseite *einmalig* beim Speichern zu generieren.
*   **Build Time:** Der Redakteur klickt "Speichern". Next.js liest alle Markdown-Dateien und baut 50 HTML-Dateien.
*   **Run Time:** Der Besucher lädt nur diese fertigen HTML-Dateien.
    *   **Keine Datenbank-Abfrage.**
    *   **Kein Code auf dem Server.**
    *   **Ladezeit < 50ms.**

---

<a name="2-projekt-setup"></a>
## 2. Projekt Setup (Zero to Hero)

So setzen Sie dieses Projekt auf einer grünen Wiese neu auf.

### Voraussetzungen
*   **Node.js:** Version 20+ (LTS).
*   **Paket Manager:** npm (kommt mit Node).

### Schritt 1: Initialisierung
```bash
npx create-next-app@latest my-website --typescript --tailwind --eslint
# Fragen beantworten:
# - Would you like to use src/ directory? -> YES
# - Would you like to use App Router? -> YES
# - Would you like to customize the default import alias? -> NO
```

### Schritt 2: Abhängigkeiten installieren
Wir brauchen Keystatic (CMS) und Markdoc (Markdown Engine).
```bash
npm install @keystatic/core @keystatic/next @markdoc/markdoc gray-matter react-fast-marquee
npm install -D @tailwindcss/typography
```

### Schritt 3: Cleanup
Löschen Sie alles in `src/app/page.tsx` und `src/app/globals.css`, wir fangen bei Null an.

---

<a name="3-technischer-stack"></a>
## 3. Technischer Stack & Design System

Wir nutzen Tailwind CSS. Das bedeutet, wir schreiben kein CSS, sondern nutzen Utility-Klassen.

### A) Konfiguration (`tailwind.config.ts`)
Wir definieren unsere "Marken-Variablen".

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Scanne alle Dateien im src Ordner
  ],
  theme: {
    extend: {
      // Unsere Farben (CI/CD konform)
      colors: {
        brand: {
          red: "#D72027",        // Elektro-Tel Rot
          "red-hover": "#DF4D52", // Hover-Effekt
        },
      },
      // Wir nutzen System-Fonts für maximale Geschwindigkeit (kein Google Fonts Download!)
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      // Keyframes für den Partner-Slider
      animation: {
        marquee: "marquee var(--duration, 40s) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  // WICHTIG: Typography Plugin für schönen Markdown-Text
  plugins: [ require('@tailwindcss/typography') ],
};
export default config;
```

### B) Globale Styles (`globals.css`)
Obwohl wir Tailwind nutzen, brauchen wir globale Regeln für Inhalte, die aus dem CMS kommen (Markdown). Da der Markdown-Parser keine Klassen in den HTML-Code schreibt (z.B. `<p>` statt `<p class="mb-4">`), müssen wir diese Elemente global stylen.

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Globale Variablen */
:root {
  --background: #ffffff;
  --foreground: #171717;
  --color-brand-red: #D72027; /* Referenz für CSS Variablen */
}

/* CMS Content Styling (.prose ist die Klasse für Text-Blöcke) */
@layer components {
  /* Listen sollen Bullets haben */
  .prose ul {
    list-style-type: disc;
    padding-left: 1.6em;
  }
  
  /* Überschriften immer Groß & Rot */
  .prose h2 {
    font-size: 1.5em;
    text-transform: uppercase;
    color: var(--color-brand-red);
    margin-top: 2em;
  }

  /* Links immer fett & rot */
  .prose a {
    color: var(--color-brand-red);
    font-weight: 600;
    text-decoration: none;
  }
  .prose a:hover {
    text-decoration: underline;
  }

  /* Tabellen (wichtig für Technische Daten) */
  .prose table {
    width: 100%;
    margin: 2em 0;
    border-collapse: collapse;
  }
  .prose td {
    padding: 0.5em;
    border-bottom: 1px solid #eee;
  }
}
```

---

<a name="4-cms"></a>
## 4. Das Content Management System (Keystatic)

Keystatic ist einzigartig: Es ist eine App, die *in Ihrer Webseite* lebt, aber Dateien *auf Ihrer Festplatte* (oder GitHub) bearbeitet.

### Konfiguration (`keystatic.config.ts`)
Hier definieren wir das Datenmodell.

**Wichtigste Regel:** Bilder gehören in `public/`.
Keystatic will Bilder standardmäßig neben die Markdown-Datei legen. Das funktioniert in Next.js nicht gut. Wir zwingen es daher:

```typescript
// @ts-nocheck
import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local', // Lokal arbeiten, Git synced dann.
    },
    collections: {
        // CONTENT TYPE: NEWS
        news: collection({
            label: 'News',
            slugField: 'title',
            path: 'content/news/*', // Speicherort
            format: { contentField: 'body' }, // Frontmatter + Markdown Body
            
            schema: {
                title: fields.slug({ name: { label: 'Titel' } }),
                
                // BILD UPLOAD LOGIK
                heroImage: fields.image({
                    label: 'Hauptbild',
                    // Ordner auf der Festplatte (wohin wird gespeichert?)
                    directory: 'public/images/news',
                    // Pfad im Browser (wie wird es geladen?)
                    publicPath: '/images/news/',
                }),

                date: fields.date({ label: 'Datum', validation: { isRequired: true } }),
                intro: fields.text({ label: 'Vorschautext' }),
                
                // MARKDOWN EDITOR
                body: fields.markdoc({
                    label: 'Inhalt',
                    extension: 'md', // Erzwinge .md Endung
                    options: {
                        image: {
                            // Auch Inline-Bilder müssen in Public!
                            directory: 'public/images/news/inline',
                            publicPath: '/images/news/inline/',
                        },
                    },
                }),
            },
        }),

        // CONTENT TYPE: TEAM
        teamMembers: collection({
            label: 'Team Members',
            slugField: 'title',
            path: 'content/team/*',
            format: { contentField: 'body' },
            schema: {
                title: fields.slug({ name: { label: 'Name' } }),
                order: fields.number({ label: 'Reihenfolge (1=Chef)' }),
                role: fields.text({ label: 'Rolle' }),
                image: fields.image({
                    label: 'Foto',
                    directory: 'public/images/team',
                    publicPath: '/images/team/',
                }),
                body: fields.markdoc({ label: 'Bio', extension: 'md' }),
            },
        }),
    },
});
```

---

<a name="5-data-engine"></a>
## 5. Die Data Engine (`src/lib/cms.ts`)

Wir brauchen eine verlässliche Methode, um die Daten zu lesen. Wir nutzen `fs` (FileSystem) und `gray-matter` (Frontmatter Parser).

### Warum nicht die Keystatic Reader API?
Die Keystatic Reader API ist gut, aber für maximale Kontrolle und Performance (Cache Handling) schreiben wir unseren eigenen, leichtgewichtigen Reader.

### Der Code (Vollständig)

**Imports & Setup**
```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdoc, { nodes, Tag } from '@markdoc/markdoc';

const contentDirectory = path.join(process.cwd(), "content");
```

**Markdown Parsing (Markdoc)**
Wir konfigurieren Markdoc so, dass `www.` Links automatisch anklickbar werden und externe Links in neuem Tab öffnen.
```typescript
const markdocConfig = {
    nodes: {
        link: {
            ...nodes.link,
            transform(node: any, config: any) {
                const attributes = node.transformAttributes(config);
                const children = node.transformChildren(config);
                let href = attributes.href;

                // Fix: Nutzer vergessen oft das https://
                if (href?.startsWith('www.')) href = `https://${href}`;

                // Props bauen
                const props: any = { ...attributes, href };

                // Security: Externe Links immer _blank und noopener
                if (href?.startsWith('http')) {
                    props.target = '_blank';
                    props.rel = 'noopener noreferrer';
                }

                return new Tag('a', props, children);
            },
        },
    },
};
```

**Die Haupt-Funktion: `getCollectionItems`**
Hier passiert die Magie.
```typescript
function getCollectionItems(collectionName: string) {
    const dir = path.join(contentDirectory, collectionName);
    if (!fs.existsSync(dir)) return [];
    
    // 1. Alle Dateien lesen
    const files = fs.readdirSync(dir);

    return files
        .filter((file) => file.endsWith('.md')) // Nur Markdown
        .map((file) => {
            // 2. Inhalt lesen
            const filePath = path.join(dir, file);
            const fileContents = fs.readFileSync(filePath, "utf8");
            
            // 3. Metadaten extrahieren (Titel, Datum etc.)
            const { data, content } = matter(fileContents);

            // 4. Markdown zu HTML rendern
            const bodyHtml = Markdoc.renderers.html(
                Markdoc.transform(Markdoc.parse(content), markdocConfig)
            );

            // 5. Objekt zurückgeben
            return {
                ...data, // Alle Felder aus Keystatic (title, date...)
                slug: file.replace(/\.md$/, ""), // Dateiname ist Slug
                body: bodyHtml,
            };
        });
}
```

**Business Logik (Beispiel: Referenzen)**
Hier sehen Sie die Sortierlogik im Detail.
```typescript
export function getAllReferences() {
    const items = getCollectionItems("references");
    
    return items.sort((a: any, b: any) => {
        // Priorität 1: Manuelle Sortierung ("Ich will das oben haben!")
        const aHasOrder = typeof a.order === 'number';
        const bHasOrder = typeof b.order === 'number';

        if (aHasOrder && bHasOrder) return a.order - b.order; // 1 vor 2
        if (aHasOrder) return -1; // A hat nummer -> A gewinnt
        if (bHasOrder) return 1;  // B hat nummer -> B gewinnt

        // Priorität 2: Datum (Neuestes zuerst)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}
```

---

<a name="6-block-pattern"></a>
## 6. Frontend Architektur: Block Pattern

Wir bauen keine fixen Seiten-Templates ("Home Template", "About Template"). Wir bauen **Blöcke**. Eine Seite ist nur eine Liste von Blöcken.

### Anatomie einer Seite (`page.tsx`)
```tsx
export default function Page({ params }) {
    // 1. Lade die Daten für diese Seite
    const pageData = getPageContent(params.slug);
    
    if (!pageData) return notFound();

    // 2. Gib die Block-Liste an den Renderer
    return <SectionRenderer blocks={pageData.blocks} />;
}
```

### Der Renderer (`SectionRenderer.tsx`)
```tsx
import { HeroBlock } from "./blocks/HeroBlock";
import { TextBlock } from "./blocks/TextBlock";

export function SectionRenderer({ blocks }) {
    return (
        <div className="flex flex-col gap-10">
            {blocks.map((block, i) => {
                // Das 'type' Feld kommt aus Keystatic
                switch (block.type) {
                    case "hero": return <HeroBlock key={i} {...block} />;
                    case "text": return <TextBlock key={i} {...block} />;
                    case "marquee": return <MarqueeBlock key={i} {...block} />;
                    default: return null; 
                }
            })}
        </div>
    );
}
```

### Wie man einen neuen Block erstellt (Tutorial)
Sie wollen einen "Zitat-Block" hinzufügen?
1.  **Component:** Erstellen Sie `src/components/blocks/QuoteBlock.tsx`.
    ```tsx
    export function QuoteBlock({ text, author }) {
        return <blockquote className="border-l-4">{text} - {author}</blockquote>;
    }
    ```
2.  **Schema:** Erweitern Sie `keystatic.config.ts` (im `pages` Schema).
    ```typescript
    blocks: {
        quote: component({
            label: 'Zitat',
            schema: {
                text: fields.text({ label: 'Zitat' }),
                author: fields.text({ label: 'Autor' }),
            }
        }),
    }
    ```
3.  **Mapping:** Fügen Sie ihn im `SectionRenderer` hinzu.
    ```tsx
    case "quote": return <QuoteBlock {...block} />;
    ```

---

<a name="7-netlify-forms"></a>
## 7. Netlify Forms Integration (Deep Dive)

Das Kontaktformular ist eine häufige Fehlerquelle. Hier ist die exakte Funktionsweise.

### Das Prinzip
Netlify bietet "Serverless Forms". Sie müssen keinen Server betreiben. Netlify scannt Ihr HTML beim Build und richtet den Service ein.

### Die Falle: JavaScript
Da unsere Seite mit React (JS) gebaut wird, existiert das Formular beim Build-Prozess ("Server Side Generation") für Netlify oft noch nicht korrekt erkennbar.
**Lösung:** Wir "faken" das Formular mit einer statischen Datei.

### Datei 1: `public/__forms.html` (Die Definition)
Diese Datei wird nie angezeigt. Sie sagt Netlify nur: "Hallo, ich werde später Daten senden, die so aussehen".
```html
<!DOCTYPE html>
<html lang="en">
<body>
    <!-- 
      WICHTIGSTE ATTRIBUTE:
      name="contact": Der eindeutige Name.
      netlify: Sagt Netlify "Scan mich!".
      netlify-honeypot="bot-field": Spam-Schutz.
    -->
    <form name="contact" netlify netlify-honeypot="bot-field" action="/kontakt?success=true" method="POST" hidden>
        <!-- Alle Felder müssen hier stehen! Auch Hidden Fields! -->
        <input type="hidden" name="form-name" value="contact" />
        <input name="bot-field" />
        <input name="name" />
        <input name="email" />
        <textarea name="message"></textarea>
    </form>
</body>
</html>
```

### Datei 2: `ContactForm.tsx` (Das Frontend)
Das echte Formular, das der User sieht. Es sendet die Daten per AJAX.

```tsx
export function ContactForm() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        // Trick: URLSearchParams wandelt die Daten in das Format um, 
        // das Netlify erwartet (application/x-www-form-urlencoded).
        const body = new URLSearchParams(formData as any).toString();

        await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body,
        });
        
        // UI auf "Erfolg" setzen
    };

    return (
        // data-netlify="true" hilft React manchmal, aber der POST Request oben ist der Schlüssel
        <form name="contact" method="POST" onSubmit={handleSubmit}>
            {/* MUSS MATCHEN: form-name = contact */}
            <input type="hidden" name="form-name" value="contact" />
            
            {/* Honeypot: Unsichtbar für User, sichtbar für Bots */}
            <p className="hidden">
               <input name="bot-field" />
            </p>
            
            <input name="email" />
            <button>Senden</button>
        </form>
    );
}
```

---

<a name="8-deployment"></a>
## 8. Deployment Pipeline

Der Weg vom Code zur Live-Seite.

1.  **Lokal:**
    *   `npm run dev`: Startet Entwicklungs-Server.
    *   `npm run build`: Simuliert das Deployment (Generiert `out/`).
    
2.  **Git:**
    *   Commit & Push zu GitHub (`infraoneit/elektro-tel`).

3.  **Netlify (Automatisch):**
    *   Netlify sieht den Push.
    *   Führt den Befehl `npm run build` auf Linux-Containern aus.
    *   Dauer: ca. **60-90 Sekunden**.
    *   Wenn erfolgreich: Neue Version ist sofort live (Atomic Deploy).
    *   Wenn Fehler: Alte Version bleibt live (Keine Downtime).

### Environment Variables
In Netlify unter "Site settings" -> "Environment variables" definiert:
*   `NODE_VERSION`: "20" (Wichtig!)
*   `NPM_FLAGS`: "--legacy-peer-deps" (Falls Versionskonflikte existieren).

---

<a name="9-troubleshooting"></a>
## 9. Troubleshooting Guide

### Fehler: "Bilder werden nicht angezeigt"
*   **Grund:** Bild wurde in `content/` Ordner statt `public/` gespeichert.
*   **Fix:** Prüfen Sie `keystatic.config.ts`. Das Feld `directory` muss auf `public/...` zeigen.

### Fehler: "Formular sendet keine Mails"
*   **Check 1:** Stimmt der `name` in `__forms.html` exakt mit dem JS-Code überein?
*   **Check 2:** Haben Sie ein Feld hinzugefügt (z.B. "Telefon"), es aber in `__forms.html` vergessen? Netlify ignoriert unbekannte Felder.

### Fehler: "Build Failed on Netlify"
*   **Grund:** Oft ein TypeScript Fehler oder eine fehlende Pflicht-Variable im CMS.
*   **Fix:**
    1.  Netlify Logs lesen ("Deploy Log").
    2.  Lokal `npm run build` ausführen. Wenn es lokal knallt, knallt es auch online.

---

**Ende der Dokumentation.**
*Diese Datei wurde automatisch durch den AntiGravity Agent generiert.*
