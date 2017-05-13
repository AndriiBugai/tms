import React, {Component} from "react";

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    }

    render() {
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
                </div>
            </div>
        )
    }
}
