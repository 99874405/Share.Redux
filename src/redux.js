function createStore(reducer, middlewares) {
    let listener = function () {}
    let state = reducer(undefined, {})
    let store = {
        getState() {
            return state
        },
        dispatch(action) {
            let newState = reducer(state, action)
            if (newState !== state) listener(state = newState)
        },
        subscribe(callback) {
            listener = callback
        },
    }

    if (Array.isArray(middlewares)) {
        middlewares.reverse().forEach(middleware => store.dispatch = middleware()(store)(store.dispatch))
    }

    return store
}


export {
    createStore
}