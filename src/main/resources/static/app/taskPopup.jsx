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

export default class TaskPopup extends React.Component {

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

    onDescriptionChange(event) {
        this.setState({description: event.target.value});
        console.log(this.state);
    }

    onPriorityChange(event, checked) {
        this.setState({topPriority: checked});
        console.log(this.state);
    }

    onSubmit() {
        let _self = this;
        let task = {
            name: _self.state.name,
            description: _self.state.description,
            topPriority: _self.state.topPriority,
            boardId: _self.props.boardId,
        };
        this.createTask(task);
    }

    createTask(task) {
        let updateCallback = this.props.updateCallback;
        let closePopup = this.props.onCancel;
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", localStorage["authToken"]);
            },
            url: "http://localhost:8080/service/createTask/",
            data: {
                name: task.name,
                // description: task.description,
                // topPriority: task.topPriority,
                boardId: task.boardId
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
                    title="New Task"
                    actions={actions}
                    modal={false}
                    open={this.props.isOpen}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        hintText="Task Name"
                        onChange={this.onNameChange.bind(this)}
                    /><br />
                    <TextField
                        hintText="Description"
                        multiLine={true}
                        rows={1}
                        rowsMax={4}
                        onChange={this.onDescriptionChange.bind(this)}
                    /><br />
                    <Checkbox
                        label="Top Priority"
                        style={styles.checkbox}
                        onCheck={this.onPriorityChange.bind(this)}
                    />
                </Dialog>
            </div>
        );
    }
}