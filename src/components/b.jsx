import React from 'react'
import { Progress, Button } from 'antd'


const initialState = {
    count: 52
}


const reducer = function (state = initialState, action = {}) {
    switch (action.type) {
        case 'decrement':
            return { count: state.count - 10 < 0 ? 0 : state.count - 10 }
        case 'increment':
            return { count: state.count + 10 > 100 ? 100 : state.count + 10 }
        default:
            return state
    }
}


export default class extends React.Component {

    state = reducer()

    dispatch() {
        this.setState(state => reducer(state, arguments[0]))
    }

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
        this.dispatch({ type: 'decrement' })
    }

    increment = () => {
        this.dispatch({ type: 'increment' })
    }
}
