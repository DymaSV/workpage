import Grid from '@material-ui/core/Grid';
import Image from './image'
import Canvas from './canvas'
import CompareImages from './compare-image'
import LinearProgress from '@material-ui/core/LinearProgress';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src1: '',
            src2: '',
            file: '',
            fileExtension: '',
            loading: false,
            useCrop: false,
            openCrop: false,
        };
        this.cropImageCallables = null;
    }

    setImageCallables = (callables) => {
        this.cropImageCallables = callables;
    }

    classes = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));

    //-----------------------begin canvas events------------------------------------------------
    handleFileChanged = (image64) => {
        this.setState({ file: image64, src2: image64, useCrop: false, openCrop: false });
    };

    handleCropImage = () => {
        this.setState({ openCrop: true })
    };

    handleCanvasEntered = () => {
        this.cropImageCallables.cropImage(this.state.openCrop);
    };

    handleCloseCanvas = () => {
        this.setState({ openCrop: false })
    };
    //----------------------- end canvas events------------------------------------------------

    handleLoading = (loading) => {
        this.setState({
            loading: loading
        });
    }

    handleFirstImageChanged = (src1) => {
        this.setState({
            src1: src1
        });
    }

    handleSecondImageChanged = (src2) => {
        this.setState({
            src2: src2
        });
    }

    handleCompareImagesFileChanged = (file) => {
        this.setState({
            file: file,
            fileExtension: file.name.split('.')[1]
        });
    }

    handleUseCropChanged = (useCrop) => {
        this.setState({
            useCrop: useCrop
        });
    }

    handleCropConfirmed = (cropConfirmed) => {
        this.setState({
            openCrop: cropConfirmed
        });
    }

    render() {
        return <div>
            <Grid item xs={12} style={{ padding: 5, textAlign: "center" }}>
                {this.state.loading ? <div className={this.classes.root}>
                    <LinearProgress />
                    <LinearProgress color="primary" />
                </div> : <div></div>}
            </Grid>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-content"
                    id="panel-header-1">
                    {"Tools"}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <CompareImages
                        file={this.state.file}
                        rootFolder={this.props.rootFolder}
                        useCrop={this.state.useCrop}
                        src2={this.state.src2}
                        onLoading={this.handleLoading}
                        onFirstImageChanged={this.handleFirstImageChanged}
                        onSecondImageChanged={this.handleSecondImageChanged}
                        onFileChanged={this.handleCompareImagesFileChanged}
                        onUseCropChanged={this.handleUseCropChanged}
                        onCropConfirmed={this.handleCropConfirmed}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <Grid item xs={12} style={{ padding: 5 }}>
                <Image key={this.state.src2 + this.state.src1} cropImage={this.setImageCallables} useCrop={this.state.useCrop} src1={this.state.src1} src2={this.state.src2} />
            </Grid>
            <Canvas openCrop={this.state.openCrop} onEntered={this.handleCanvasEntered} fileChanged={this.handleFileChanged} closeCanvas={this.handleCloseCanvas} />
        </div >
    }
}

export default Main