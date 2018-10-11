import React from 'react'
import Types from 'prop-types'
import { Progress, Button } from 'antd'


function createStore(reducer, middleware) {
    let cb = function () {}
    let state = reducer(undefined, {})
    let store = {
        getState() {
            return state
        },
        dispatch(action) {
            state = reducer(state, action)
            cb()
        },
        subscribe(listener) {
            cb = listener
        }
    }

    store.dispatch = middleware()(store)(store.dispatch)

    return store
}

const store = createStore((state = { count: 50 }, action) => {
    switch (action.type) {

        case 'decrement':
            return { count: state.count - 10 < 0 ? 0 : state.count - 10 }

        case 'increment':
            return { count: state.count + 10 > 100 ? 100 : state.count + 10 }

        default:
            return state
    }
}, () => {
    return ({ dispatch, getState }) => {
        return next => {
            return action => {
                if (typeof action === 'function') {
                    action(dispatch, getState)
                } else {
                    next(action)
                }
            }
        }
    }
})


function connect(mapStataToProps) {
    return Component => {
        return class extends React.Component {

            static contextTypes = {
                store: Types.object,
                dispatch: Types.func,
                subscribe: Types.func,
            }

            componentWillMount() {
                this.context.subscribe(() => { this.forceUpdate() })
            }

            render() {
                console.log(this)
                return <Component dispatch={this.context.dispatch} { ...mapStataToProps(this.context.store.getState()) } />
            }
        }
    }
}



const A_Wrapper = connect(state => state)(
    class A extends React.Component {

        render() {
            console.log(this)
            return (
                <div>
                    <Progress type="circle" percent={this.props.count} />&nbsp;&nbsp;
                    <Button.Group>
                        <Button icon="minus" onClick={this.decrement} />
                        <Button icon="plus" onClick={this.increment} />
                    </Button.Group>
                </div>
            )
        }

        decrement = () => {
            this.props.dispatch({ type: 'decrement' })
        }

        increment = () => {
            this.props.dispatch(dispatch => {
                setTimeout(() => { dispatch({ type: 'increment' }) }, 1000)
            })
        }
    })


export default class extends React.Component {

    static childContextTypes = {
        store: Types.object,
        dispatch: Types.func,
        subscribe: Types.func,
    }

    getChildContext() {
        return {
            store: store,
            dispatch: store.dispatch,
            subscribe: store.subscribe
        }
    }

    render() {
        return <A_Wrapper />
    }
}