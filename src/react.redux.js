import React from 'react'
import Types from 'prop-types'


export class Provider extends React.Component {
    static childContextTypes = {
        store: Types.object
    }

    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        return this.props.children
    }
}


export function connect(mapStateToProps = function () {}) {
    return Component => {
        return class extends React.Component {
            static contextTypes = {
                store: Types.object
            }

            componentWillMount() {
                this.context.store.subscribe(() => this.forceUpdate())
            }

            render() {
                return (
                    <Component dispatch={this.context.store.dispatch} {...mapStateToProps(this.context.store.getState())} />
                )
            }
        }
    }
}


export {
    Provider,
    connect,
}