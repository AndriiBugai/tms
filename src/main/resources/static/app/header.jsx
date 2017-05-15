import React, {Component} from "react";
import { Redirect } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';


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
            logedIn2: true
        };
    }

    logOut() {
        this.setState({logedIn2: false});
    }

    render() {
        if(!this.state.logedIn2) {
            return <Redirect to='/login'/>;
        }

        return (
            <div className="header">
                <div className="header__header-content">
                    <div className="side left-side">
                        <div className="title">
                            To Do List
                        </div>
                        <div className="subtitle">
                            Java EE lab
                        </div>
                    </div>
                    <div className="side right-side">
                        <RaisedButton
                            label="Log Out"
                            onTouchTap={this.logOut.bind(this)} />
                    </div>
                </div>


            </div>
        )
    }
}
