export function clampMeta(value: string | undefined, maxLength: number): string | undefined {
    if (!value) return value;
    if (value.length <= maxLength) return value;
    return value.slice(0, maxLength - 1).trimEnd() + "…";
}

export function buildAlternates(path: string) {
    return {
        canonical: path,
        languages: {
            "de-CH": path,
        },
    };
}
