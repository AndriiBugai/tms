import React, {Component} from "react";
import injectTapEventPlugin from 'react-tap-event-plugin';

import RaisedButton from 'material-ui/RaisedButton';
import ConfirmationPopup from './confirmationPopup.jsx';
import TaskPopup from './taskPopup.jsx';


import ReactDom from "react-dom";
import $ from 'jquery';
import FontAwesome from "react-fontawesome"

export default class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            taskPopupIsOpen: false
        };
        injectTapEventPlugin();

    }

    openPopup() {
        this.setState({
            taskPopupIsOpen: true
        });
    }

    closePopup() {
        this.setState({
            taskPopupIsOpen: false
        });
    }


    loadFromServer(boardId) {
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

    update() {
        let boardId = this.props.boardId;
        this.loadFromServer(boardId);
    }

    componentDidMount() {
        this.loadFromServer(0);
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    componentWillReceiveProps(nextProps) {
        this.loadFromServer(nextProps.boardId);
    }

    render() {
        let updateCallback = this.update.bind(this);
        let closePopupCallback = this.closePopup.bind(this);
        return (
            <div className="task-list">
                <div className="task-list-menu">
                    <span>
                        Your tasks:
                    </span>

                    <span className="addTask">
                        <RaisedButton label="Dialog" onTouchTap={() => this.openPopup()} />
                        <TaskPopup isOpen={this.state.taskPopupIsOpen}
                                           onCancel={closePopupCallback}
                                           onSubmit={() => this.createTask()}
                                           updateCallback={updateCallback}
                                           boardId={this.props.boardId}
                        />
                    </span>
                </div>
                {this.state.tasks.map(function (task) {
                    return (
                        <TaskItem key={task.id} task={task} updateCallback={updateCallback} />
                    );
                })}
            </div>
        )
    }
}

class TaskItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deletionPopupIsOpen: false
        };
    }

    openPopup() {
        this.setState({
            deletionPopupIsOpen: true
        });
    }

    closePopup() {
        this.setState({
            deletionPopupIsOpen: false
        });
    }

    deleteTask() {
        let taskId = this.props.task.id;
        let updateCallback = this.props.updateCallback;
        let closePopup = this.closePopup.bind(this);
        $.ajax({
            url: "http://localhost:8080/service/deleteTasksById/" + taskId,
            success: () => {
                updateCallback();
                closePopup();
            },
            error: (xhr, status, err) => {
                console.error("url", status, err.toString());
            }
        });
    }

    render() {
        return (
            <div key={this.props.task.id} className="task">
                <div className="task-body">
                    {this.props.task.name}
                </div>
                <div className="task-controls">
                    <div className="deleteTask" onClick={() => this.openPopup()}>
                        <FontAwesome name='trash-o' />
                    </div>
                </div>
                <ConfirmationPopup isOpen={this.state.deletionPopupIsOpen}
                                   onCancel={() => this.closePopup()}
                                   onSubmit={() => this.deleteTask()}
                />

            </div>
        );
    }
}

