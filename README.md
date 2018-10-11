import React from 'react'
import Types from 'prop-types'

const store = {
    profile: {
        name: 'free',
        age: 20
    }
}

function aaa(fn1) {
    return Component => {
        return class Wrapper extends React.Component {
            render() {
                return <Component {...fn1(store)} />
            }
        }
    }
}


const C_Wrapper = aaa(state => {
    return state
})(
    class C extends React.Component {
        render() {
    
            console.log(this)
    
            return (
                <div>
                    {/* { this.context.profile.name } */}
                    {/* { this.props.profile.name } */}
                </div>
            )
        }
    }
)

class B extends React.Component {
    render() {
        return (
            <C_Wrapper />
        )
    }
}

class A extends React.Component {

    static contextTypes = {
        profile: Types.object
    }
    render() {
        return (
            <B />
        )
    }
}

class Wrap extends React.Component {
    static contextTypes = {
        profile: Types.object
    }

    render() {
        return (
            <div>
                <A {...this.context} />                
            </div>
        )
    }
}

export default class extends React.Component {

    static childContextTypes = {
        profile: Types.object
    }

    getChildContext() {
        return store
    }

    render() {
        return <Wrap />
    }
}