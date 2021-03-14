import Vuex from "vuex";
import {ApiResource} from "../classes/api-resource";
import {ApiResourceLoader} from "../classes/api-resource-loader";
import Vue from "vue";

export default function createStore() {
    return new Vuex.Store({
        state: {
            isAdminMode: false
        },
        mutations: {
            setAdminMode(state: any, isAdminMode: boolean) {
                state.isAdminMode = isAdminMode;
            },
            ensureResourceIsLoaded(state: any, resource: ApiResource) {
                if (state.hasOwnProperty(resource.key) && state[resource.key] !== null) {
                    return;
                }
                let apiResourceLoader = new ApiResourceLoader(resource);
                apiResourceLoader.load((content: string) => {
                    Vue.set(state, resource.key, content);
                })
            }
        }
    })
}
