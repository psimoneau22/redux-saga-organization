import { Provider } from 'react-redux'
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { history, store } from '../setup';
import List from './List';
import Detail from './Detail';

export default class extends Component {
    render () {
        return (
            <Router history={history}>
                <MuiThemeProvider>
                    <Provider store={store}>
                        <div>
                            <Route path="/" component={List} />
                            <Route path="/" component={Detail} />
                        </div>
                    </Provider>
                </MuiThemeProvider>
            </Router>
        );
    }
}