export function pluralForm(quantity: number, word: string): string {
    return word + (quantity > 1 ? "s" : "");
}
