import React from 'react'
import { Progress, Button } from 'antd'



// redux
import { createStore } from '../redux'
import { connect, Provider } from '../react.redux'



// fetch
const fetch = function (action) {
    return dispatch => {
        clearTimeout(window.timeId) || (window.timeId = setTimeout(() => dispatch(action), 1000))
    }
}



// stroe
const store = createStore((state, action) => {
    switch (action.type) {
        case 'decrement':
            return { count: state.count - 10 < 0 ? 0 : state.count - 10 }
        
        case 'increment':
            return { count: state.count + 10 > 100 ? 100 : state.count + 10 }
        
        default:
            return state || { count: 50 }
    }
},


// middlewares
[
    function thunk() {
        return store => {
            return next => {
                return action => {
                    if (typeof action === 'function') action(next)
                    if (typeof action === 'object') next(action)
                }
            }
        }
    },
    function logger() {
        return store => {
            return next => {
                return action => {
                    console.log('%c prev state', 'color: #666666; font-weight: 700;', store.getState())
                    next(action); console.log('%c action    ', 'color: #40a9ff; font-weight: 700;', action)
                    console.log('%c next state', 'color: #009a61; font-weight: 700;', store.getState())
                    console.log('')
                }
            }
        }
    }
])



// Component
const UI = connect(state => state)(class extends React.Component {
    render() {
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
        this.props.dispatch(fetch({ type: 'increment' }))
    }
})



export default class extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <UI />
            </Provider>
        )
    }
}