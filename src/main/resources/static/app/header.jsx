import React, {Component} from "react";
import {Redirect, Link, BrowserRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';


// const styles = {
//     logOutBtn: {
//         float: right,
//     }
// };
export default class Header extends React.Component {

    constructor(props) {
        let userProfileView = false;
        if(props.page == 'profileView') {
            userProfileView = true;
        }
        super(props);
        this.state = {
            tasks: [],
            logedIn2: true,
            userProfileView: userProfileView,
            taskView: false
        };
    }

    logOut() {
        this.setState({logedIn2: false});
        let _self = this;
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/user-service/logOut/",
            success: (data) => {
                localStorage["authToken"] = null;
                localStorage["userLogin"] = null;
                localStorage["userId"] = null;
                this.setState({logedIn2: false});
            },
            error: (xhr, status, err) => {
                console.error("url", status, err.toString());
            }
        });
    }

    redirectToUserProfile() {
        this.setState({userProfileView: true, taskView: false});
    }

    backToTasks() {
        this.setState({userProfileView: false, taskView: true});
    }

    render() {
        if (!this.state.logedIn2) {
            return <Redirect to='/loginView'/>;
        }
        if (this.state.userProfileView) {
            return <Redirect to='/profileView'/>;
        }
        if (this.state.taskView) {
            return <Redirect to='/taskView'/>;
        }
        let userProfileBtnText = localStorage['userLogin'] + ' profile';

        return (
            <div className="header">
                <div className="header__header-content">
                    <div className="side left-side">
                        <div className="title">
                            To Do List
                        </div>
                        <div className="subtitle">
                            Java EE project
                        </div>
                    </div>
                    <ControlBtns
                        userProfileView={this.state.userProfileView}
                        taskView={this.state.taskView}
                        userProfileBtnText={userProfileBtnText}
                        userProfileBtnClick={this.redirectToUserProfile.bind(this)}
                        logOutBtnClick={this.logOut.bind(this)}
                        backToTasks={this.backToTasks.bind(this)}
                    />
                </div>
            </div>
        )
    }


}

function ControlBtns(props) {
    if (localStorage["userLogin"]) {
        return (
            <div className="side right-side">
                <span className="input-group-btn">
                  <Link to="/taskView">Tasks</Link>
                </span>
                <span className="input-group-btn">
                  <Link to="/profileView">Profile</Link>
                </span>
                <span className="input-group-btn">
                  <Link to="/">Log Out</Link>
                </span>
            </div>
        )
    } else {
        return (<div className="side right-side"></div>)
    }
}
