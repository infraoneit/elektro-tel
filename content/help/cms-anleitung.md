---
title: "CMS Anleitung"
---
# CMS Bedienungsanleitung (Elektro-Tel)

## 0. Der technische Aufbau (Das "Big Picture")
Bevor wir ins Detail gehen, hier eine Erklärung, wie die Systeme zusammenarbeiten.

### Wer macht was?
1.  **Hostpoint:** Hier ist Ihre Domain (`elektro-tel.ch`) registriert. Hostpoint leitet alle Besucher weiter an -> Netlify.
2.  **Netlify:** Hier "wohnt" die Webseite (Hosting). Netlify baut die Webseite und liefert sie an die Besucher aus.
3.  **GitHub:** Hier liegt der eigentliche **Quellcode** und die **Datenbank** (Texte/Bilder). Der Speicherort heißt `infraoneit/elektro-tel` (Private Repository).
4.  **Keystatic (CMS):** Das ist nur die Bedienoberfläche, um die Dateien auf GitHub bequem zu ändern.

### Der Kreislauf
*   Besucher -> Hostpoint -> Netlify (Webseite sehen).
*   Sie (Redakteur) -> Keystatic CMS -> GitHub (Änderung speichern).
*   GitHub -> meldet an -> Netlify -> baut Seite neu (ca. 1 Min).

---

## 1. Erste Schritte

### Wie speichere ich Änderungen?
Wenn Sie einen Text bearbeitet haben, ist die Änderung **nicht sofort** auf der öffentlichen Webseite sichtbar.
1.  Klicken Sie oben rechts auf den Button **"Save"**.
2.  Das System startet nun im Hintergrund eine Aktualisierung ("Build").
3.  **Wichtig:** Es dauert ca. **1-2 Minuten**, bis die Änderung auf der echten Webseite erscheint. Geduld ist hier wichtig.

### Bilder hochladen
*   **Format:** Bitte nutzen Sie idealerweise das **Querformat (16:9)** für News.
*   **Größe:** Bilder sollten **nicht größer als 500 KB** sein. Zu große Bilder machen die Webseite langsam (schlecht für Google & Besucher).
*   **Dateiname:** Benennen Sie Bilder sinnvoll *bevor* Sie sie hochladen (z.B. `weihnachtsfeier-2024.jpg` statt `IMG_9823.jpg`). Das hilft der Suchmaschine.

---

## 2. Bereiche bearbeiten & Homepage-Logik

Im Menü links sehen Sie verschiedene "Collections" (Sammlungen). Hier ist erklärt, was wofür ist und wie es auf der Homepage erscheint:

### News (Neuigkeiten)
Hier erstellen Sie Blog-Beiträge oder Firmen-News.
*   **Anzeige auf Home:** Es werden immer die **3 neusten** Artikel angezeigt.
*   **Anzeige Unterseite:** Unter `/news` sind alle Artikel sichtbar.
*   **Inhalt:** Sie können vollständige Artikel schreiben, Bilder im Text einfügen, Tabellen nutzen etc.
*   **Date:** Sortierung erfolgt automatisch nach Datum (neu ganz oben).

### Referenzen (Projekte)
Hier präsentieren Sie Ihre abgeschlossenen Projekte.
*   **Anzeige auf Home (Slider):** Der Slider zeigt die **6 neusten** Projekte (sortiert nach Datum).
*   **Anzeige Unterseite:** Unter `/referenzen` sind alle Projekte sichtbar.
*   **Sortierung überschreiben:**
    *   Feld **"Manual Sort Order"**: Tragen Sie hier eine Zahl ein (z.B. `1`, `2`), um ein Projekt **fix an diese Position** zu setzen.
    *   Damit können Sie steuern, was im Slider auf der Startseite ganz vorne steht, unabhängig vom Datum.
    *   Einträge ohne Nummer werden danach chronologisch (nach Datum) aufgefüllt.
    *   Das Datum selbst ist **nur im CMS** sichtbar (für die Sortierung), nicht auf der Website.

### Jobs (Offene Stellen)
Inserieren Sie hier neue Stellen.
*   **Anzeige auf Home:** Es werden immer die **3 neusten** Stellen angezeigt.
*   **Anzeige Unterseite:** Unter `/jobs` sind alle Stellen aufgelistet.
*   **SEO:** Jede Stellenanzeige generiert eine eigene Unterseite (z.B. `/jobs/elektroinstallateur`), damit sie von Google optimal gefunden wird.
*   **Date:** Dient nur der internen Sortierung (neueste zuerst), wird auf der Webseite nicht angezeigt.

### Partners
Logos der Partnerfirmen.
*   **Anzeige auf Home:** Im Partner-Laufband werden **alle** Einträge angezeigt.
*   **Sortierung:** Nutzen Sie das Feld "Order" (Zahl), um die Reihenfolge der Logos im Laufband anzupassen.

### Team Members
Mitarbeiterprofile.
*   **Anzeige auf Home:** Hier werden **nur die ersten 4** Personen angezeigt (z.B. Geschäftsleitung).
*   **Anzeige Unterseite:** Unter `/team` werden **alle** Mitarbeiter angezeigt.
*   **Sortierung:** Über das Feld "Order" steuern Sie die Reihenfolge.
    *   `1` = Ganz vorne (auch auf Home sichtbar).
    *   `5` = Erscheint nur auf der Unterseite (da > 4).

---

## 3. Hilfe bei Problemen

*   **Fehler "Build Error":** Wenn die Seite sich nicht aktualisiert, haben Sie vielleicht ein **Pflichtfeld** leer gelassen (z.B. Datum oder Titel). Prüfen Sie Ihren letzten Eintrag.
*   **Seite lädt nicht:** Probieren Sie, die Webseite mit **STRG + F5** (Windows) oder **CMD + R** (Mac) neu zu laden, um den alten Speicher (Cache) zu löschen.

Viel Erfolg bei der Pflege Ihrer Webseite!
