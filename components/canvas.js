import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import React from 'react';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src2: this.props.src2,
            open: this.props.openCrop,
            croppedImageUrl: null
        };
    }

    handleCloseSave = () => {
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'CanvasAsImage.png');
        let canvas = document.getElementById('myCanvas');
        let dataUrl = canvas.toDataURL();
        this.props.fileChanged(dataUrl);
    }

    handleCloseCancel = () => {
        this.props.closeCanvas();
    }

    handleOnEntered = () => {
        this.props.onEntered();
    }

    render() {
        return <div>
            <Dialog
                open={this.props.openCrop}
                onClose={this.handleCloseCancel}
                onEntered={this.handleOnEntered}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <div>
                        <canvas id="myCanvas"></canvas>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseCancel} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.handleCloseSave} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}


export default Canvas