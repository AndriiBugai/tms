import React, {Component} from "react";
import { Redirect } from 'react-router'
import ReactDom from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';


import {Tabs, Tab} from 'material-ui/Tabs';
import Header from './header.jsx';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery';



const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    handleInputChange (name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    }

    signIn() {
        let _self = this;
        let signInData = {
            login: this.state.login,
            password: this.state.password
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/user-service/signIn/",
            data: {
                login: signInData.login,
                password: signInData.password
            },
            success: (data) => {
                // updateCallback();
                // closePopup();
                if (data) {
                    _self.setState({logedIn: true});

                }
            },
            error: (xhr, status, err) => {
                console.error("url", status, err.toString());
            }
        });
    }

    register() {
        let _self = this;
        let registerData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            login: this.state.login,
            password: this.state.password
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/user-service/register/",
            data: {
                firstName: registerData.firstName,
                lastName: registerData.lastName,
                email: registerData.email,
                login: registerData.login,
                password: registerData.password
            },
            success: (data) => {
                if (data) {
                    _self.setState({logedIn: true});
                }
            },
            error: (xhr, status, err) => {
                console.error("url", status, err.toString());
            }
        });
    }

    render() {
        if(this.state.logedIn) {
            return <Redirect to='/taskView'/>;
        }

        return (
            <div>
                <Header/>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="Sign In" value="a">
                        <div>

                            <p className="sign-in-menu">
                                <h2 style={styles.headline}>Sign In</h2>
                                <TextField
                                    hintText="Input your Login"
                                    floatingLabelText="Login"
                                    onChange={this.handleInputChange.bind(this, 'login')}
                                /><br />
                                <TextField
                                    hintText="Input your Password"
                                    floatingLabelText="Password"
                                    type="password"
                                    onChange={this.handleInputChange.bind(this, 'password')}
                                /><br />
                                <FlatButton label="Ok"
                                            primary={true}
                                            onTouchTap={this.signIn.bind(this)}/>
                            </p>
                        </div>
                    </Tab>
                    <Tab label="Register" value="b">
                        <div>
                            <p className="sign-in-menu">
                                <h2 style={styles.headline}>Register</h2>
                                <TextField
                                    hintText="Input your First Name"
                                    floatingLabelText="First Name"
                                    onChange={this.handleInputChange.bind(this, 'firstName')}
                                /><br />
                                <TextField
                                    hintText="Input your Last Name"
                                    floatingLabelText="Last Name"
                                    onChange={this.handleInputChange.bind(this, 'lastName')}
                                /><br />
                                <TextField
                                    hintText="Input your Email"
                                    floatingLabelText="Email"
                                    onChange={this.handleInputChange.bind(this, 'email')}
                                /><br />
                                <TextField
                                    hintText="Input your Login"
                                    floatingLabelText="Login"
                                    onChange={this.handleInputChange.bind(this, 'login')}
                                /><br />
                                <TextField
                                    hintText="Input your Password"
                                    floatingLabelText="Password"
                                    type="password"
                                    onChange={this.handleInputChange.bind(this, 'password')}
                                /><br />
                                <FlatButton label="Ok"
                                            primary={true}
                                            onTouchTap={this.register.bind(this)}/>
                            </p>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

// function MyApp() {
//     return (
//         <MuiThemeProvider>
//             <LoginPage />
//         </MuiThemeProvider>
//     )
// }
//
// ReactDom.render(<MyApp />, document.getElementById('react'));