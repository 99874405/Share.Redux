

export function createStore(reducer, middlewares) {
    let listener = () => {}
    let state = reducer(undefined, {})
    let store = {
        getState() {
            return state
        },
        dispatch(action) {
            state = reducer(state, action); listener();
        },
        subscribe(callback) {
            listener = callback
        },
    }
    
    if (Array.isArray(middlewares)) {
        middlewares.reverse().forEach(middleware => store.dispatch = middleware(store)(store.dispatch))
    }

    return store
}