import Vuex from "vuex";

export default function createStore() {
    return new Vuex.Store({
        state: {
            greeting: "World",
            exclamationMarksCount: 5
        },
        mutations: {
            setGreeting(state, greeting) {
                state.greeting = greeting
            },
            setExclamationMarks(state, exclamationMarksCount) {
                state.exclamationMarksCount = exclamationMarksCount
            }
        }
    })
}
