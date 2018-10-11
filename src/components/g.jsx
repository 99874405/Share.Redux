import React from 'react'
import { Progress, Button } from 'antd'


import { createStore } from '../redux'
import { Provider } from '../react.redux'


const store = createStore(() => {
    return 50
})


class UI extends React.Component {

    state = {
        count: 51
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
        this.setState(state => ({ count: state.count - 10 < 0 ? 0 : state.count - 10 }))
    }

    increment = () => {
        this.setState(state => ({ count: state.count + 10 > 100 ? 100 : state.count + 10 }))
    }
}


export default class extends React.Component {
    render() {
        return (
            <Provider store={store}> 
                <UI />
            </Provider>
        )
    }
}