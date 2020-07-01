import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import ReactCrop from 'react-image-crop';
import React from 'react';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: '',
            setCrop: '',
            src1: this.props.src1,
            src2: this.props.src2,
            open: false,
            croppedImageUrl: null
        };
        this.imagePreviewCanvasRef = React.createRef();
    }

    onImageLoaded = image => {
        this.imageRef = image;
    }

    onCropComplete = crop => {
        if (crop.height > 0 && crop.width > 0) {
            this.setState({ open: true });
            this.makeClientCrop(crop);
        }
    }

    onCropChange = (crop, percentCrop) => {
        this.setState({ crop });
    }

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            this.getCroppedImg(
                this.imageRef,
                crop
            );
        }
    }

    getCroppedImg = (image, crop) => {
        const canvas = this.imagePreviewCanvasRef.current;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleCloseSave = () => {
        this.setState({ open: false });
    }

    handleCloseCancel = () => {
        this.setState({ open: false });
    }

    render() {
        return <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ textAlign: "center" }}>
                        <img id="myImg" src={this.props.src1} alt="Image #1" width="100%" />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ textAlign: "center" }}>
                        <ReactCrop
                            src={this.props.src2}
                            crop={this.state.crop}
                            ruleOfThirds
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                            alt="Image #2" />
                    </Paper>
                </Grid>
            </Grid>
            <Dialog
                open={this.state.open}
                onClose={this.handleCloseCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <div>
                        <canvas ref={this.imagePreviewCanvasRef}></canvas>
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


export default Image