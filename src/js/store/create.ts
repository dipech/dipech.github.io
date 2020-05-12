import Vuex from "vuex";
import axios from "axios";

export default function createStore() {
    return new Vuex.Store({
        state: {
            resume: null,
            greeting: "World",
            exclamationMarksCount: 5
        },
        mutations: {
            ensureResumeIsLoaded(state) {
                if (state.resume !== null) {
                    return;
                }
                axios.get("resources/data/resume/data.json")
                    .then(function (response) {
                        state.resume = response.data;
                    })
                    .catch(function () {
                        alert("Cannot load resume data :(");
                    });
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
