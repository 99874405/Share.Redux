

export function createStore(reducer, middlewares) {
    let listener = () => {}
    let state = reducer(undefined, {})
    let store = {
        getState() {
            return state
        },
        dispatch(action) {
            state = reducer(state, action); listener()
        },
        subscribe(callback) {
            listener = callback
        },
    }
    
    if (Array.isArray(middlewares)) {
        middlewares.forEach(middleware => store.dispatch = middleware()(store.dispatch))
    }

    return store
}