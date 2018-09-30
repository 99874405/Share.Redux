import React from 'react'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import { Progress, Button } from 'antd'


const initialState = {
    count: 56
}


const store = createStore(function (state = initialState, action = {}) {
    switch (action.type) {
        case 'decrement':
            return { count: state.count - 10 < 0 ? 0 : state.count - 10 }
        case 'increment':
            return { count: state.count + 10 > 100 ? 100 : state.count + 10 }
        default:
            return state
    }
},
    applyMiddleware(thunk, logger)
)


function async_decrement() {
    return dispatch => {
        setTimeout(() => dispatch(arguments[0]), 1500)
    }
}


function async_increment() {
    return dispatch => {
        setTimeout(() => dispatch(arguments[0]), 1500)
    }
}


@connect(
    state => {
        return (
            state
        )
    },
    dispatch => {
        return {
            decrement: () => dispatch(async_decrement({ type: 'decrement' })),
            increment: () => dispatch(async_increment({ type: 'increment' })),
        }
    }
)
class Component extends React.Component {

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
        this.props.decrement()
    }

    increment = () => {
        this.props.increment()
    }
}


export default class extends React.Component {
    render() {
        return (
            <Provider store={store} children={<Component />} />
        )
    }
}
