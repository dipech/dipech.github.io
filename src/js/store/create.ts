import Vuex from "vuex";
import {loadJsonIntoStateProperty} from "./json-loader";
import {getResourceUrl} from "../functions/functions";
import {Resource} from "../classes/resource";

export default function createStore() {
    return new Vuex.Store({
        state: {
            resume: null,
            portfolio: null,
            aboutMe: null,
            resources: new Map()
        },
        mutations: {
            ensureResumeIsLoaded(state, callback: () => void) {
                loadJsonIntoStateProperty(state, "resume", getResourceUrl("resume", "data.json"), callback);
            },
            ensurePortfolioIsLoaded(state, callback: () => void) {
                loadJsonIntoStateProperty(state, "portfolio", getResourceUrl("portfolio", "data.json"), callback);
            },
            ensureAboutMeIsLoaded(state, callback: () => void) {
                loadJsonIntoStateProperty(state, "aboutMe", getResourceUrl("about-me", "data.json"), callback);
            },
            addResource(state, resource: Resource) {
                state.resources.set(resource.keyword, resource.value);
            }
        }
    })
}
