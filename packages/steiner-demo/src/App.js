import React, { Component } from 'react';
import { BrowserRouter, Match, Link } from 'react-router';

import './App.css';
import routes from './routes';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <div className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <Link className="navbar-brand" to="/">Steiner</Link>
                            </div>
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav">
                                    <li>
                                        <Link to="/hotels">Hotels</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        {routes.map((route, i) => (
                            <Match key={i} {...route}/>
                        ))}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;