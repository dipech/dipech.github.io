import Vuex from "vuex";
import axios from "axios";

export default function createStore() {
    return new Vuex.Store({
        state: {
            resume: null,
            portfolio: null,
            alerts: []
        },
        mutations: {
            ensureResumeIsLoaded(state) {
                loadJsonIntoStateProperty(state, "resume", "resources/data/resume/data.json");
            },
            ensurePortfolioIsLoaded(state) {
                loadJsonIntoStateProperty(state, "portfolio", "resources/data/portfolio/data.json");
            },
            addAlert(state: any, alert: object) {
                let alertKey = JSON.stringify(alert);
                let alreadyIndex = state.alerts.findIndex((alert: any) => alert.key === alertKey)
                if (alreadyIndex > -1) {
                    return;
                }
                state.alerts.push({
                    ...alert,
                    key: alertKey
                });
            },
            removeAlert(state: any, index: number) {
                state.alerts.splice(index, 1);
            }
        }
    })
}

function loadJsonIntoStateProperty(state: any, property: string, jsonUrl: string) {
    if (state[property] !== null) {
        return;
    }
    axios.get(jsonUrl)
        .then(function (response) {
            state[property] = response.data;
        })
        .catch(function () {
            alert("Cannot load " + property + " data :(");
        });
}
