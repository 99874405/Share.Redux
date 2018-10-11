import React from 'react'
import Types from 'prop-types'

const store = {
    profile: {
        name: 'free',
        age: 20
    }
}

function aaa(fn1) {
    return SSS => {
        return class Wrapper extends React.Component {
            render() {
                return <SSS {...fn1(store)} />
            }
        }
    }
}


const CW = aaa(state => {
    return state
})(
    class C extends React.Component {

        static contextTypes = {
            profile: Types.object
        }
    
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
            <CW />
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