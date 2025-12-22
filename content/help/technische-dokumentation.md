---
title: "Technische Dokumentation"
---
# Technische Dokumentation & Architektur

Diese Dokumentation bietet einen tiefen Einblick in die technische Struktur der Elektro-Tel AG Webseite. Sie richtet sich an Entwickler, IT-Administratoren und technisch interessierte Anwender.

## 1. Architektur-Übersicht (Jamstack)
Die Webseite basiert auf dem **Jamstack-Prinzip** (Javascript, APIs, Markup). Im Gegensatz zu monolithischen CMS-Systemen (wie WordPress oder Typo3) sind Frontend und Content-Datenbank hier entkoppelt.

### Kern-Konzepte
*   **Static Site Generation (SSG):** Die gesamte Webseite wird zur "Build-Time" (beim Speichern) einmal komplett generiert. Das Ergebnis sind reine HTML/CSS/JS-Dateien.
*   **Dateisystem als Datenbank:** Es gibt keine klassische SQL-Datenbank. Alle Inhalte liegen als Markdown-Dateien (`.md`) im Git-Repository.
*   **Atomic Deployments:** Jeder "Save" im CMS erzeugt einen neuen Git-Commit. Netlify baut daraus eine komplett neue Version der Webseite.

---

## 2. Technologie-Stack

### Core Framework
*   **Next.js 16 (App Router):** Das modernste React-Framework. Wir nutzen den "App Router" (`src/app`) für Routing und Layouts.
*   **React 19:** Die UI-Bibliothek für komponenten-basiertes Design.
*   **Turbopack:** Der neue, extrem schnelle Bundler für Entwicklung und Build.

### Content Management & Daten
*   **Keystatic:** Ein "Headless" CMS, das direkt im Git-Repository lebt. Es bietet eine grafische Oberfläche (`/keystatic`), verändert aber im Hintergrund nur Textdateien.
*   **Markdoc:** Eine mächtige Markdown-Erweiterung (von Stripe entwickelt). Wir nutzen es, um komplexe Inhalte wie Tabellen oder Bilder im Text sicher zu rendern.
*   **Gray-Matter:** Parser für YAML-Frontmatter (Metadaten am Anfang der Dateien).

### Styling & UI
*   **Tailwind CSS v4:** Ein Utility-First CSS Framework. Wir nutzen die neueste Version (v4 alpha/beta integriert via PostCSS).
*   **Lucide React:** Eine konsistente Icon-Bibliothek (SVG).
*   **Framer Motion:** Für Animationen und Übergänge.

### Hosting & CI/CD
*   **Netlify:** Hoster. Kümmert sich um SSL, CDN (Global Edge Network) und die Builds.
*   **GitHub:** Source Verson Control.

---

## 3. Ordner-Struktur & Datenbank-Schema

Das Projekt ist strikt organisiert. Hier ist der Detail-Aufbau:

### `/content` (Die Datenbank)
Hier liegen die "Rohdaten". Jede Änderung hier löst einen Build aus.
*   `/help/`: Diese Anleitungen (`cms-anleitung.md`, `technische-dokumentation.md`).
*   `/jobs/`: Stellenangebote. Feld `date` steuert die Sortierung.
*   `/news/`: Blog-Artikel. Bilder liegen *nicht* hier, sondern in `public`.
*   `/pages/`: Statische Inhalte für "Über uns" etc.
*   `/partners/`: Partner-Logos und Links.
*   `/references/`: Die wichtigste Collection. Enthält komplexe Felder wie `manualSortOrder`.
*   `/team/`: Mitarbeiter-Profile.

### `/src` (Der Quellcode)
*   `/app/`: Das Routing-System.
    *   `(site)`: Das öffentliche Frontend (mit Header/Footer Layout).
    *   `keystatic`: Das CMS-Admin-Panel (eigenes, isoliertes Layout ohne Header/Footer).
    *   `globals.css`: Globale Styles und Tailwind-Direktiven.
*   `/components/`: Wiederverwendbare UI-Elemente.
    *   `/blocks/`: Große Sektionen wie "Hero", "Services", "Map".
    *   `/cms/`: Komponenten, die CMS-Daten darstellen (z.B. `NewsPreviewBlock`).
    *   `/ui/`: Kleine Atome wie Buttons, Inputs, Container.
*   `/lib/`: Logik-Schicht.
    *   `cms.ts`: **Zentrale Schnittstelle**. Hier passiert das Auslesen der Markdown-Dateien und das Umwandeln in HTML (Markdoc).
    *   `utils.ts`: Kleine Helfer (z.B. CSS-Klassen-Manager).

### `/public` (Statische Assets)
Dateien, die direkt ausgeliefert werden.
*   `/images/`: Upload-Ziel für das CMS. Unterteilt in `news`, `references`, `team`.
*   `__forms.html`: Eine versteckte Datei für Netlify Forms (damit der Bot die Felder erkennt).

---

## 4. Datenfluss (Data Flow)

Wie kommt der Text vom CMS auf den Bildschirm?

1.  **Eingabe:** Redakteur speichert "News A" im CMS.
2.  **Speicherung:** Keystatic schreibt eine Datei `content/news/news-a.md` und commitet sie zu Git.
3.  **Build-Trigger:** Netlify erkennt "Neuer Commit" und startet `npm run build`.
4.  **Fetching (`cms.ts`):**
    *   Next.js ruft `getAllNews()` auf.
    *   Das Skript liest den Ordner `content/news`.
    *   Es parst das YAML-Frontmatter (Titel, Datum) und den Markdown-Body.
    *   Markdoc wandelt den Body in sicheres HTML um.
5.  **Rendering:**
    *   Die Seite `/news/news-a` wird generiert (Server Side Rendering -> Static HTML).
    *   Tailwind CSS scannt den neuen Inhalt und generiert die nötigen Styles.
6.  **Auslieferung:** Das fertige HTML-Paket wird auf das CDN (Content Delivery Network) kopiert.

---

## 5. Abhängigkeiten & Fallstricke

### Bilder
Bilder werden nicht in der Datenbank gespeichert, sondern als Pfad (String).
*   **Pflicht:** Der Ordner `public/images/...` muss existieren.
*   **Besonderheit:** Im CMS wird der Pfad als `/images/news/bild.jpg` gespeichert. Im Browser wird das relativ zur Domain aufgelöst.

### Build-Zeiten
Da die Seite bei jeder Änderung *komplett* neu gebaut wird, wächst die Build-Zeit mit der Anzahl der Seiten linear an. Aktuell ca. 45-60 Sekunden. Dies ist ein bewusster Trade-off für maximale Auslieferungs-Geschwindigkeit.

### Netlify Forms
Das Kontaktformular nutzt keinen eigenen Mailserver.
*   Die Datei `src/components/ContactForm.tsx` sendet einen POST-Request.
*   Wichtig: Das versteckte Feld `form-name` muss exakt mit dem Namen in `public/__forms.html` übereinstimmen.

---

## 6. Lokale Entwicklung (Für Programmierer)

Wer Änderungen am Code vornehmen will:

1.  **Setup:**
    ```bash
    git clone <repo-url>
    npm install
    ```
2.  **Dev Server:**
    ```bash
    npm run dev
    # Startet auf http://localhost:3000
    ```
3.  **CMS lokal:**
    Das CMS ist unter `http://localhost:3000/keystatic` erreichbar. Änderungen werden direkt ins lokale Dateisystem geschrieben.

4.  **Produktions-Test:**
    ```bash
    npm run build
    npm start
    ```
    Simuliert die echte Server-Umgebung. Wichtig, um Build-Fehler vor dem Push zu finden.
