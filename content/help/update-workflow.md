---
title: "Update Workflow"
---
# Updates & Wartung

Es gibt zwei Arten von "Updates" bei einer Webseite. Hier wird der Unterschied erklärt.

## 1. Inhaltliche Updates (Täglich)
**Wer macht das?** Sie / Ihr Büro-Team.
**Wie?** Über das **CMS** (diese Oberfläche).

Das ist der Normalfall. Sie schreiben News, ändern Texte oder fügen Mitarbeiter hinzu.
*   **Risiko:** Sehr gering. Sie können nichts kaputt machen.
*   **Technik:** Passiert alles automatisch im Hintergrund.

---

## 2. Technische Updates (Selten)
**Wer macht das?** Ein Web-Entwickler / IT-Support.
**Wie?** Über **GitHub** (Programmcode).

Manchmal muss an der "Maschine" selbst etwas geändert werden, zum Beispiel:
*   Sie wollen eine komplett neue Seite "Unsere Geschichte" hinzufügen.
*   Das Design (Farben, Schriftart) soll geändert werden.
*   Ein neues Feature (z.B. ein Kostenrechner) soll eingebaut werden.

### Anleitung für den Entwickler
Falls Sie einen externen Techniker beauftragen, geben Sie ihm diese Information:

*   Der Code liegt auf **GitHub**.
*   Er muss das Repository "klonen" (herunterladen).
*   Er muss Node.js installiert haben.
*   Befehl zum Starten: `npm run dev`.
*   Wenn er fertig ist, muss er den Code "pushen" (hochladen).
*   **Wichtig:** Netlify aktualisiert die Live-Seite dann automatisch. Er muss keine Dateien per FTP hochladen!
