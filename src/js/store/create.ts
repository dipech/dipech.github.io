import Vuex from "vuex";
import axios from "axios";

export default function createStore() {
    return new Vuex.Store({
        state: {
            resume: null,
            portfolio: null,
            greeting: "World",
            exclamationMarksCount: 5
        },
        mutations: {
            ensureResumeIsLoaded(state) {
                loadJsonIntoStateProperty(state, "resume", "resources/data/resume/data.json");
            },
            ensurePortfolioIsLoaded(state) {
                loadJsonIntoStateProperty(state, "portfolio", "resources/data/portfolio/data.json");
            },
            setGreeting(state, greeting) {
                state.greeting = greeting
            },
            setExclamationMarks(state, exclamationMarksCount) {
                state.exclamationMarksCount = exclamationMarksCount
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
