import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import ReactCrop from 'react-image-crop';
import React from 'react';
import { image64toCanvasRef } from './utils';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: { aspect: 1 / 1 },
            setCrop: '',
            src1: this.props.src1,
            src2: this.props.src2,
            open: false
        };
        this.imagePreviewCanvasRef = React.createRef();
    }

    handleOnCrop = (crop) => {
        // console.log(crop);
        this.setState({ crop: crop });
    }

    handleOnImageLoaded = (image) => {
        // console.log(image);
    }

    handleOnCropComlete = (crop, pixelCrop) => {
        console.log(this.imagePreviewCanvasRef);
        image64toCanvasRef(this.imagePreviewCanvasRef.current, this.state.src2, pixelCrop);
        this.setState({ open: true });
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
                            onChange={this.handleOnCrop}
                            onImageLoaded={this.handleOnImageLoaded}
                            onComplete={this.handleOnCropComlete}
                            alt="Image #2" />
                        {/* <img id="myImg" src={this.props.src2} alt="Image #2" width="100%" /> */}
                    </Paper>
                </Grid>
            </Grid>
            <div>
                <canvas ref={this.imagePreviewCanvasRef} style={{position: "absolute", border: "solid", borderColor: "#000000", width: "100px", height: "100px"}}></canvas>
            </div>
        </div>
    }
}


export default Image