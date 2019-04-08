function createStore(reducer, middlewares) {
    let _callback = () => {}
    let _state = reducer(undefined, {})
    let _store = {
        getState() {
            return _state
        },
        dispatch(action) {
            let newState = reducer(_state, action)
            if (newState !== _state) _callback(_state = newState)
        },
        subscribe(callback) {
            _callback = callback
        },
    }

    if (Array.isArray(middlewares)) {
        middlewares.reverse().forEach(middleware => {
            _store.dispatch = middleware()(_store)(_store.dispatch)
        })
    }

    return _store
}


export {
    createStore
}