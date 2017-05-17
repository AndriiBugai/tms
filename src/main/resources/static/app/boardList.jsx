import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import BoardPopup from './boardPopup.jsx'

import ReactDom from "react-dom";
import $ from 'jquery';

import FontAwesome from "react-fontawesome"
import ConfirmationPopup from './confirmationPopup.jsx';



export default class BoardList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            boardPopupIsOpen: false
        };
    }

    loadCommentsFromServer() {
        $.ajax({
            url: "http://localhost:8080/service/getAllBoards",
            dataType: 'json',
            success: (data) => {
                this.setState({boards: data});
            },
            error: (xhr, status, err) => {
                console.error("url", status, err.toString());
            }
        });
    }

    update() {
        this.loadCommentsFromServer();
    }

    componentDidMount() {
        this.loadCommentsFromServer();
    }

    componentWillUnmount() {
        // this.serverRequest.abort();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({boardSelected: nextProps.boardId});
    }

    openPopup() {
        this.setState({
            boardPopupIsOpen: true
        });
    }

    closePopup() {
        this.setState({
            boardPopupIsOpen: false
        });
    }

    render() {
        let onClickFunc = this.props.onClick;
        let selectedBoard = this.state.boardSelected;

        let updateCallback = this.update.bind(this);
        let closePopupCallback = this.closePopup.bind(this);
        return (
            <div className="board-list">
                <div className="boards-list-menu">
                    Your boards:

                    <span className="addTask">
                        <RaisedButton label="Add Board" onTouchTap={() => this.openPopup()}/>
                        <BoardPopup isOpen={this.state.boardPopupIsOpen}
                                    onCancel={closePopupCallback}
                                    updateCallback={updateCallback}
                        />
                    </span>
                </div>
                {this.state.boards.map(function (board) {
                    return (
                        <BoardItem
                            key={board.id}
                            board={board}
                            onClick={() => onClickFunc(board.id)}
                            selected={selectedBoard == board.id}
                            updateCallback={updateCallback}
                        />
                    );
                })}
            </div>
        )
    }
}

class BoardItem extends React.Component {

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
        let taskId = this.props.board.id;
        let updateCallback = this.props.updateCallback;
        let closePopup = this.closePopup.bind(this);
        $.ajax({
            url: "http://localhost:8080/service/deleteBoardById/" + taskId,
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
            <div key={this.props.board.id} onClick={this.props.onClick} className={"task " + (this.props.selected ? "selected" : "")}>
                <div className="task-body">
                    <a href="">
                        {this.props.board.name}
                    </a>
                </div>
                <div className="task-controls">
                    <div className="deleteTask" onClick={() => this.openPopup()}>
                        <FontAwesome name='trash-o'/>
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

