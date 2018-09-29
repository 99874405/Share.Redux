import React from 'react'
import Thunk from 'redux-thunk'
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
    applyMiddleware(Thunk)
)


@connect(
    state => {
        return (
            state
        )
    },
    dispatch => {
        return {
            decrement: () => dispatch(dispatch => setTimeout(() => dispatch({ type: 'decrement' }), 1000)),
            increment: () => dispatch(dispatch => setTimeout(() => dispatch({ type: 'increment' }), 1000)),
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
