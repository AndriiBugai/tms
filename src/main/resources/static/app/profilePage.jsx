import React, {Component} from "react";
import { Redirect } from 'react-router'
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

export default class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleInputChange (name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    }

    componentDidMount() {
        this.loadFromServer();
    }

    loadFromServer(boardId) {
        $.ajax({
            url: "http://localhost:8080/user-service/getCurrentUser",
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", window["authToken"]);
            },
            success: (data) => {
                this.setState({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    login: data.login,
                });
            },
            error: (xhr, status, err) => {
                console.error("url", status, err.toString());
            }
        });
    }

    updateProfile() {
        let _self = this;
        let registerData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            login: this.state.login,
            password: this.state.password,
            passwordRepeat: this.state.passwordRepeat
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/user-service/updateProfile",
            data: {
                firstName: registerData.firstName,
                lastName: registerData.lastName,
                email: registerData.email,
                login: registerData.login,
                password: registerData.password,
                passwordRepeat: registerData.passwordRepeat
            },
            success: (data) => {
                if (data) {
                    //_self.setState({logedIn: true});
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
                <Header />

                    <div>
                        <p className="sign-in-menu">
                            <h2 style={styles.headline}>Register</h2>
                            <TextField
                                hintText="Input your First Name"
                                floatingLabelText="First Name"
                                onChange={this.handleInputChange.bind(this, 'firstName')}
                                value={this.state.firstName}
                            /><br />
                            <TextField
                                hintText="Input your Last Name"
                                floatingLabelText="Last Name"
                                onChange={this.handleInputChange.bind(this, 'lastName')}
                                value={this.state.lastName}
                            /><br />
                            <TextField
                                hintText="Input your Email"
                                floatingLabelText="Email"
                                onChange={this.handleInputChange.bind(this, 'email')}
                                value={this.state.email}
                            /><br />
                            <TextField
                                hintText="Input your Login"
                                floatingLabelText="Login"
                                onChange={this.handleInputChange.bind(this, 'login')}
                                value={this.state.login}
                            /><br />
                            <TextField
                                hintText="Input your Password"
                                floatingLabelText="Password"
                                type="password"
                                onChange={this.handleInputChange.bind(this, 'password')}
                            /><br />
                            <TextField
                                hintText="Repeat your Password"
                                floatingLabelText="Password"
                                type="password"
                                onChange={this.handleInputChange.bind(this, 'passwordRepeat')}
                            /><br />
                            <FlatButton label="Save changes"
                                        primary={true}
                                        onTouchTap={this.updateProfile.bind(this)}/>
                        </p>
                    </div>

            </div>
        );
    }

}