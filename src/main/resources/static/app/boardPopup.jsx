import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import $ from 'jquery';


const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

export default class BoardPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           task: {}
        };
    }

    onNameChange(event) {
        this.setState({name: event.target.value});
        console.log(this.state);
    }


    onSubmit() {
        let _self = this;
        let task = {
            name: _self.state.name,
        };
        this.createBoard(task);
    }

    createBoard(task) {
        let updateCallback = this.props.updateCallback;
        let closePopup = this.props.onCancel;
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/service/createBoard/",
            data: {
                name: task.name,
            },
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
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.onCancel}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.onSubmit.bind(this)}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="New Board"
                    actions={actions}
                    modal={false}
                    open={this.props.isOpen}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        hintText="Board Name"
                        onChange={this.onNameChange.bind(this)}
                    /><br />
                </Dialog>
            </div>
        );
    }
}