"use client";

import { useState } from "react";

/**
 * Interactive Contact Form Component.
 * 
 * Features:
 * - Client-side validation
 * - Async submission via Fetch API
 * - Netlify Forms integration (hidden fields)
 * - Success/Error states
 */
export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const formData = new FormData(form);

        const body = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
            body.append(key, String(value));
        }

        try {
            const res = await fetch("/.netlify/forms", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: body.toString(),
            });

            if (!res.ok) throw new Error(`Status ${res.status}`);

            setStatus("success");
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-green-50 p-8 border border-green-200 rounded-sm text-center">
                <h3 className="text-2xl font-bold text-green-700 mb-4">Vielen Dank!</h3>
                <p className="text-green-800">Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns umgehend bei Ihnen.</p>
                <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-bold underline text-green-700">Neue Nachricht senden</button>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="bg-red-50 p-8 border border-red-200 rounded-sm text-center">
                <h3 className="text-2xl font-bold text-red-700 mb-4">Fehler</h3>
                <p className="text-red-800">Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder rufen Sie uns an.</p>
                <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-bold underline text-red-700">Zurück zum Formular</button>
            </div>
        );
    }

    return (
        <form
            name="contact"
            method="POST"
            action="/kontakt?success=true"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <input type="hidden" name="form-name" value="contact" />

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold uppercase text-slate-700 mb-2">Vorname Nachname*</label>
                    <input required name="name" type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all text-slate-900" />
                </div>
                <div>
                    <label className="block text-sm font-bold uppercase text-slate-700 mb-2">Firma</label>
                    <input name="company" type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all text-slate-900" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold uppercase text-slate-700 mb-2">E-Mail*</label>
                    <input required name="email" type="email" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all text-slate-900" />
                </div>
                <div>
                    <label className="block text-sm font-bold uppercase text-slate-700 mb-2">Telefon</label>
                    <input name="phone" type="tel" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all text-slate-900" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold uppercase text-slate-700 mb-2">Standort</label>
                    <div className="relative">
                        <select name="location" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all text-slate-900 appearance-none">
                            <option>Winterthur</option>
                            <option>Tägerwilen</option>
                            <option>Schaffhausen</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold uppercase text-slate-700 mb-2">Anliegen</label>
                    <div className="relative">
                        <select name="subject" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all text-slate-900 appearance-none">
                            <option>Offerte anfordern</option>
                            <option>Service / Unterhalt</option>
                            <option>Störung melden</option>
                            <option>Beratung</option>
                            <option>Jobs / Karriere</option>
                            <option>Sonstiges</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold uppercase text-slate-700 mb-2">Ihre Nachricht*</label>
                <textarea required name="message" rows={5} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-all text-slate-900"></textarea>
            </div>

            <div className="flex items-start gap-3">
                <input required type="checkbox" id="privacy" className="mt-1 w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red" />
                <label htmlFor="privacy" className="text-sm text-slate-600">
                    Ich stimme der Verarbeitung meiner Daten gemäss der <a href="/datenschutz" className="underline hover:text-brand-red">Datenschutzerklärung</a> zu.*
                </label>
            </div>

            <button type="submit" disabled={status === "submitting"} className="bg-brand-red text-white font-bold uppercase py-4 px-8 rounded-sm hover:bg-brand-red-hover transition-colors w-full md:w-auto disabled:opacity-50">
                {status === "submitting" ? "Wird gesendet..." : "Nachricht senden"}
            </button>
        </form>
    );
}
