import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class ConfirmationPopup extends React.Component {


    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.onCancel}
            />,
            <FlatButton
                label="Yes"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.onSubmit}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Are you sure you want to delete this task?"
                    actions={actions}
                    modal={false}
                    open={this.props.isOpen}
                    onRequestClose={this.handleClose}
                >
                </Dialog>
            </div>
        );
    }
}