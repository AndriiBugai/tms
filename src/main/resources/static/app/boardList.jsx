import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import BoardPopup from './boardPopup.jsx'

import ReactDom from "react-dom";
import $ from 'jquery';

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
                        <RaisedButton label="Add Board" onTouchTap={() => this.openPopup()} />
                        <BoardPopup isOpen={this.state.boardPopupIsOpen}
                                   onCancel={closePopupCallback}
                                   updateCallback={updateCallback}
                        />
                    </span>
                </div>
                {this.state.boards.map(function (board) {
                    return (
                        <BoardItem
                            key = {board.id}
                            board = {board}
                            onClick = {() => onClickFunc(board.id)}
                            selected = {selectedBoard == board.id}
                        />
                    );
                })}
            </div>
        )
    }
}

function BoardItem(props) {
    return (
        <div key={props.board.id} onClick={props.onClick} className={"task " + (props.selected ? "selected" : "")}>
            <a href="">
                {props.board.name}
            </a>




        </div>
    );
}

