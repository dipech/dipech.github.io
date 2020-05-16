import {loadResource} from "../functions/functions";

export function loadJsonIntoStateProperty(state: any, property: string, jsonUrl: string, callback: () => void) {
    if (state[property] !== null) {
        if (callback) {
            callback();
        }
        return;
    }
    loadResource(jsonUrl, (content: string) => {
        state[property] = content;
        if (callback) {
            callback();
        }
    });
}