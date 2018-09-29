import React from 'react'
import { Progress, Button } from 'antd'


export default class extends React.Component {

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
