import React from 'react'
import Types from 'prop-types'


export class Provider extends React.Component {
    
    getChildContext() {
        return {
            store: this.props.store
        }
    }

    static childContextTypes = {
        store: Types.object
    }

    render() {
        return this.props.children
    }
}


export function connect() {
    return function () {
        
    }
}