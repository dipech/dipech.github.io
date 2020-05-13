export function pluralForm(quantity: number, word: string) {
    return word + (quantity  > 1 ? "s" : "");
}
