
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, HashRouter } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import TaskBoard from './app/taskBoard.jsx';
import LoginPage from './app/loginPage.jsx';
import ProfilePage from './app/profilePage.jsx';

injectTapEventPlugin();
ReactDOM.render((

    <MuiThemeProvider>
        <div>
            <HashRouter>
                <div>
                    <Route exact path='/' component={LoginPage}/>
                    <Route path='/taskView' component={TaskBoard}/>
                    <Route path='/loginView' component={LoginPage}/>
                    <Route path='/profileView' component={ProfilePage}/>
                </div>
            </HashRouter>
        </div>
    </MuiThemeProvider>
    ),
    document.getElementById('react')
);