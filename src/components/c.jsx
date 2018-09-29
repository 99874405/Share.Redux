import React from 'react'
import { createStore } from 'redux'
import { Progress, Button } from 'antd'


const initialState = {
    count: 53
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
})


export default class extends React.Component {

    state = store.getState()

    render() {
        return (
            <div>
                <Progress type="circle" percent={this.state.count} />&nbsp;&nbsp;
                <Button.Group>
                    <Button icon="minus" onClick={this.decrement} />
                    <Button icon="plus" onClick={this.increment} />
                </Button.Group>
            </div>
        )
    }

    decrement = () => {
        store.dispatch({ type: 'decrement' }) && this.setState(store.getState())
    }

    increment = () => {
        store.dispatch({ type: 'increment' }) && this.setState(store.getState())
    }
}
