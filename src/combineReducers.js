function combineReducers(reducers, globalState = {}) {
    return (state, action) => {
        return Object.keys(reducers).forEach(modular => globalState[modular] = reducers[modular](state && state[modular], action)), globalState
    }
}


export {
    combineReducers
}