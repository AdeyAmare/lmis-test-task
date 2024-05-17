export function replaceAcronym(acronym: string): string {
    const cityAcronyms: Record<string, string> = {
        AA: 'Addis Ababa',
        // Add more acronyms and cities as needed
    };
    return cityAcronyms[acronym] || acronym;
}