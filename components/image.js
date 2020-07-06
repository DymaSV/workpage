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
            useCrop: this.props.useCrop,
            croppedImageUrl: null
        };
        this.props.cropImage({
            cropImage: this.onCropComplete
        });
    }
    componentDidMount() {
        var img_2 = document.getElementById("img2");
        if (img_2 && img_2.src) {
            var img_1 = document.getElementById("img1");
            if (this.props.src1) {
                img_2.height = img_1.height;
            }
        }
    }

    onImageLoaded = image => {
        this.imageRef = image;
    }

    onCropComplete = () => {
        if (this.state.crop.height > 0 && this.state.crop.width > 0) {
            this.makeClientCrop(this.state.crop);
        }
    }

    onCropChange = (crop, percentCrop) => {
        this.setState({ crop });
    }

    makeClientCrop = (crop) => {
        if (this.imageRef && crop.width && crop.height) {
            this.getCroppedImg(
                this.imageRef,
                crop
            );
        }
    }

    getCroppedImg = (image, crop) => {
        const canvas = document.getElementById("myCanvas");
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

    render() {
        return <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ textAlign: "center" }}>
                        <img id="img1" key={this.props.src1} src={this.props.src1} alt="Image #1" />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ textAlign: "center" }}>
                        {this.state.useCrop
                            ? <ReactCrop
                                key={this.props.src2}
                                src={this.props.src2}
                                crop={this.state.crop}
                                ruleOfThirds
                                onImageLoaded={this.onImageLoaded}
                                onChange={this.onCropChange}
                                alt="Image #2" />
                            : <img id="img2" key={this.props.src2} src={this.props.src2} alt="Image #2" />
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>
    }
}


export default Image