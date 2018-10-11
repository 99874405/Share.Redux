import React from 'react'
import Types from 'prop-types'


const store = {
    profile: {
        name: 'free',
        age: 20
    }
}


function connect(mapStateToProps) {
    
    return Component => {
        
        return (
            class extends React.Component {

                state = mapStateToProps(store)

                componentDidMount() {
                    
                    // store.listener
                    setInterval(() => {
                        
                        this.setState(state => {
                            return Object.assign({}, state, {
                                now: Date.now()
                            })
                        })

                    }, 2000)
                }

                render() {
                    return <Component {...this.state} />
                }
            }
        )
    }
}


const C_Wrapper = connect(state => state)(
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
    render() {
        return (
            <B />
        )
    }
}


class App extends React.Component {
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
        return <App />
    }
}