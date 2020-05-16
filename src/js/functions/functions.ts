import axios from "axios";

export function pluralForm(quantity: number, word: string) {
    return word + (quantity  > 1 ? "s" : "");
}

export function getResourceUrl(scope: string, relativeFilePath: string) {
    return "resources/data/" + scope + "/" + relativeFilePath;
}

export function loadResource(resourceUrl: string, callback: (content: string) => void) {
    axios.get(resourceUrl)
        .then(function (response) {
            callback(response.data);
        })
        .catch(function (e) {
            console.log(e);
            alert("Cannot load a resource by url: " + resourceUrl);
        });
}
