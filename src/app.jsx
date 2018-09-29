import React from 'react'
import { A, B, C, D, E, F, Welcome } from './components'
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom'


export default class extends React.Component {
    render() {
        return (
            <BrowserRouter children={
                <div className="container">
                    <div className="__navbar__">
                        <NavLink activeClassName="__active__" to="/1">场景 1</NavLink>
                        <NavLink activeClassName="__active__" to="/2">场景 2</NavLink>
                        <NavLink activeClassName="__active__" to="/3">场景 3</NavLink>
                        <NavLink activeClassName="__active__" to="/4">场景 4</NavLink>
                        <NavLink activeClassName="__active__" to="/5">场景 5</NavLink>
                    </div>
                    <div className="__container__">
                        <Switch>
                            <Route exact path="/1" component={A} />
                            <Route exact path="/2" component={B} />
                            <Route exact path="/3" component={C} />
                            <Route exact path="/4" component={D} />
                            <Route exact path="/5" component={E} />
                            <Route component={Welcome} />
                        </Switch>
                    </div>
                </div>
            } />
        )
    }
}
