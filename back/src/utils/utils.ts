export function removeHtml(string: string): string {
    return string
        // remove all html tags
        // https://stackoverflow.com/questions/5002111/how-to-strip-html-tags-from-string-in-javascript
        .replace(/<\/?[^>]+(>|$)/g, "")
        // remove all spaces
        // https://stackoverflow.com/questions/6623231/remove-all-white-spaces-from-text
        .replace(/ /g, '');
}

export function convertToArray<T>(input: T | T[]): T[] {
    if (!input)
        return [];

    return Array.isArray(input) ? input : [input];
}