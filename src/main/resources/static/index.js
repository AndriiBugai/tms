
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import TaskBoard from './app/taskBoard.jsx';
import LoginPage from './app/loginPage.jsx';

injectTapEventPlugin();
ReactDOM.render((

    <MuiThemeProvider>
        <BrowserRouter>
            <div>
                <Route path='/' component={LoginPage}/>
                <Route path='/taskView' component={TaskBoard}/>
                <Route path='/loginView' component={LoginPage}/>
            </div>
        </BrowserRouter>
    </MuiThemeProvider>
    ),
    document.getElementById('react')
);