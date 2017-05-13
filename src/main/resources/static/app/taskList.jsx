import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import ReactDom from "react-dom";
import $ from 'jquery';
import FontAwesome from "react-fontawesome"


export default class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
        injectTapEventPlugin();
    }

    loadCommentsFromServer(boardId) {
        $.ajax({
            url: "http://localhost:8080/service/getTasksByBoard/" + boardId,
            dataType: 'json',
            success: (data) => {
                this.setState({tasks: data});
            },
            error: (xhr, status, err) => {
                console.error("url", status, err.toString());
            }
        });
    }

    componentDidMount() {
        this.loadCommentsFromServer(0);
        // setInterval(this.loadCommentsFromServer.bind(this), 100);
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    componentWillReceiveProps(nextProps) {
        this.loadCommentsFromServer(nextProps.boardId);
    }

    render() {
        return (


            <div className="task-list">
                <MuiThemeProvider>
                    <DialogExampleSimple/>
                </MuiThemeProvider>

                <div> Your tasks:</div>
                {this.state.tasks.map(function (task) {
                    return (
                        <TaskItem key={task.id} task={task} />
                    );

                })}
            </div>
        )
    }
}

function TaskItem(props) {
    return (
        <div key={props.task.id} className="task">
            <div className="task-body">
                {props.task.name}
            </div>
            <div className="task-controls">
                <FontAwesome name='trash-o' />
            </div>
        </div>
    );
}

class DialogExampleSimple extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    The actions in this window were passed in as an array of React objects.
                </Dialog>
            </div>
        );
    }
}