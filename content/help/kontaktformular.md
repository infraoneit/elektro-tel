---
title: "Kontaktformular"
---
# Das Kontaktformular verstehen

Auf Ihrer Kontaktseite gibt es ein Formular, über das Kunden Ihnen Nachrichten senden können.

## 1. Technischer Aufbau (Code Beispiele)

Das Formular arbeitet mit **Netlify Forms**. Das System besteht aus zwei Teilen, die exakt zusammenpassen müssen.

### A) Die Definition (Hidden Form)
Liegt in `public/__forms.html`. Diese Datei ist unsichtbar, sagt Netlify aber, welche Felder existieren.
```html
<!-- Dient nur der Erkennung durch Netlify -->
<form name="contact" netlify netlify-honeypot="bot-field" action="/kontakt?success=true" method="POST" hidden>
    <input type="hidden" name="form-name" value="contact" />
    <input name="name" />
    <input name="email" />
    <!-- ... weitere Felder ... -->
</form>
```

### B) Das Frontend (React)
Liegt in `src/components/ContactForm.tsx`. Das ist das, was der Kunde sieht.
*   Es sendet die Daten per JavaScript (`fetch`) an Netlify.
*   Es zeigt Erfolgs- oder Fehlermeldungen an, ohne die Seite neu zu laden.

```tsx
// Ausschnitt aus dem Code
const handleSubmit = async (e) => {
    // ... Formulardaten sammeln
    await fetch("/.netlify/forms", {
        method: "POST",
        body: body.toString(), // Sendet Daten an Netlify
    });
};
```

---

## 2. Wohin gehen die E-Mails?
Die Nachrichten landen bei **Netlify**. Sie können einstellen, an wen sie weitergeleitet werden.

## 3. Wie ändere ich die Empfänger-Adresse?
Wenn Sie möchten, dass Anfragen an eine andere E-Mail-Adresse (z.B. `info@elektro-tel.ch`) gehen, müssen Sie dies bei Netlify einstellen. Das geht nicht im CMS!

**Schritt-für-Schritt Anleitung:**
1.  Loggen Sie sich auf **www.netlify.com** ein (Zugangsdaten sollten Ihnen vorliegen).
2.  Klicken Sie in der Liste auf Ihre Webseite ("Elektro-Tel").
3.  Klicken Sie im Menü oben auf **"Site configuration"** (Zahnrad).
4.  Klicken Sie links im Menü auf **"Forms"** und dann **"Form notifications"**.
5.  Dort sehen Sie "Email notifications".
6.  Klicken Sie auf **"Add notification"** -> **"Email notification"**.
7.  Geben Sie die gewünschte E-Mail-Adresse ein und speichern Sie.

*Hinweis: Sie können auch mehrere E-Mail-Adressen eintragen.*

## 4. Spam-Schutz
Netlify hat einen eingebauten Spam-Filter ("Honeypot").
*   Echte Nachrichten werden Ihnen sofort zugestellt.
*   Offensichtlicher Spam wird aussortiert (Sie sehen ihn unter dem Reiter "Forms" -> "Spam" bei Netlify).
*   Sie müssen kein Captcha ("Ich bin kein Roboter") lösen, was für Ihre Kunden angenehmer ist.
