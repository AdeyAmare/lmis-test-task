export function replaceAcronym(acronym: string): string {
    const cityAcronyms: Record<string, string> = {
        AA: 'Addis Ababa',
        // Add more acronyms and cities as needed
    };
    return cityAcronyms[acronym] || acronym;
}


export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function combineNames(row: { first_name: string; father_name: string; }) {
    const firstName = capitalizeFirstLetter(row.first_name);
    const fatherName = capitalizeFirstLetter(row.father_name);
    return `${firstName} ${fatherName}`;
}


export const formatShortMonth = (date: string) => {
    return date.slice(0, 3).toUpperCase()
};