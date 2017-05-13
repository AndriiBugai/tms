import React, {Component} from "react";
import ReactDom from "react-dom";
import $ from 'jquery';

export default class BoardList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            boards: []
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

    componentDidMount() {
        this.loadCommentsFromServer();
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({boardSelected: nextProps.boardId});
    }

    render() {
        let onClickFunc = this.props.onClick;
        let selectedBoard = this.state.boardSelected;
        return (
            <div className="board-list">
                <div>Your boards:</div>
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

