import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
            <h1 className="text-9xl font-bold text-slate-200">404</h1>
            <h2 className="text-3xl font-bold text-slate-900 mt-4 uppercase">Seite nicht gefunden</h2>
            <p className="text-slate-600 mt-2 text-center max-w-md">
                Die gesuchte Seite existiert nicht oder wurde verschoben.
            </p>
            <Link
                href="/"
                className="mt-8 px-8 py-3 bg-brand-red text-white font-bold uppercase tracking-wide hover:bg-brand-red-hover transition-colors flex items-center gap-2"
            >
                <MoveLeft size={20} />
                Zurück zur Startseite
            </Link>
        </div>
    );
}
