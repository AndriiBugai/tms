import React, {Component} from "react";
import ReactDom from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Header from './header.jsx';
import BoardList from './boardList.jsx';
import TaskList from './taskList.jsx';

const BOARDS_URL = "http://localhost:8080/service/getAllBoards";
const ALL_TASKS_URL = "http://localhost:8080/service/getAllTasks";
const TASK_URL = "http://localhost:8080/service/getTasksByBoard/";
const BOARD_BY_ID_URL = "http://localhost:8080/service/getBoardById/";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            boardSelected: 0,
        };
    }

    checkBoard(boardId) {
        console.log(boardId);
        this.setState({boardSelected: boardId})
    }

    render() {
        return (
            <div>
                <Header/>
                <BoardList boardId={this.state.boardSelected} onClick={i => this.checkBoard(i)}/>
                <TaskList boardId={this.state.boardSelected}/>
            </div>
        )
    }
}

function MyApp() {
    return (
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    )
}

ReactDom.render(<MyApp />, document.getElementById('react'));