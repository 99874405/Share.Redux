

export function createStore(reducer, middleware) {
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
    
    if (middleware) {
        middleware()
    }

    return store
}