import React, {Component} from "react";
import { Redirect } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';


// const styles = {
//     logOutBtn: {
//         float: right,
//     }
// };
export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            logedIn2: true,
            userProfileView: false
        };
    }

    logOut() {
        this.setState({logedIn2: false});
        let _self = this;
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/user-service/logOut/",
            success: (data) => {
                window["authToken"] = null;
                window["userLogin"] = null;
                this.setState({logedIn2: false});
            },
            error: (xhr, status, err) => {
                console.error("url", status, err.toString());
            }
        });
    }

    redirectToUserProfile() {
        this.setState({userProfileView: true});
    }

    render() {
        if(!this.state.logedIn2) {
            return <Redirect to='/loginView'/>;
        }
        if(this.state.userProfileView) {
            return <Redirect to='/profileView'/>;
        }
        let userProfileBtnText = window['userLogin'] + ' profile';

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
                        userProfileBtnText = {userProfileBtnText}
                        userProfileBtnClick = {this.redirectToUserProfile.bind(this)}
                        logOutBtnClick = {this.logOut.bind(this)}
                    />
                </div>
            </div>
        )
    }


}

function ControlBtns(props) {
    if(window["userLogin"]) {
        return (
            <div className="side right-side">
                <RaisedButton
                    className="btn"
                    label={props.userProfileBtnText}
                    onTouchTap={props.userProfileBtnClick} />
                <RaisedButton
                    className="btn"
                    label="Log Out"
                    onTouchTap={props.logOutBtnClick} />
            </div>
        )
    } else {
        return (<div className="side right-side"></div>)
    }
}
