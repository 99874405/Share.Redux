function createStore(reducer, middlewares) {
    let cb = () => {}
    let state = reducer(undefined, {})
    let store = {
        subscribe(callback) {
            cb = callback
        },
        dispatch(action) {
            cb(state = reducer(state, action))
        },
        getState() {
            return state
        },
    }

    if (Array.isArray(middlewares)) {
        middlewares.reverse().forEach(middleware => {
            store.dispatch = middleware()(store)(store.dispatch)
        })
    }

    return store
}


export {
    createStore
}