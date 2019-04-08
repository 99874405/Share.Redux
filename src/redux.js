function createStore(reducer, middlewares) {
    let _callback = () => {}
    let _state = reducer(undefined, {})
    let _store = {
        getState() {
            return state
        },
        dispatch(action) {
            let newState = reducer(state, action)
            if (newState !== state) _callback(state = newState)
        },
        subscribe(callback) {
            _callback = callback
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