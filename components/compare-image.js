import SelectImage from './select-image'
import SelectFolder from './select-folder'
import DialogMessage from './dialog-message';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { firebaseStorage } from "../services/init-firebase";
import { sortByDate, getForatedDate } from "../components/utils";

class CompareImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rootFolder: this.props.rootFolder,
            choseFolder: '',
            photoName: '',
            open: false,
            error: ''
        };
        this.resetFirstSelectCall = null;
        this.resetSecondSelectCall = null;
    }

    handleSecondImageSubmit = (event) => {
        this.props.onUseCropChanged(true);
        this.setState({
            fileExtension: '',
            photoName: ''
        });
        let file = event.target.files[0]
        var reader = new window.FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onloadend = () => {
            this.props.onSecondImageChanged([reader.result]);
            this.props.onFileChanged(file);
        }
        event.target.value = null;
    }

    loadToFirebase = () => {
        if(!this.state.choseFolder)
        {
            this.setState({ open: true, error: "The folder is undefined! Please choose your folder." });
            return;
        }
        if (this.props.file) {
            const storageRef = firebaseStorage.ref(this.state.choseFolder);
            let fileRef = getForatedDate();
            if (this.props.file.name) {
                if (this.props.file.name.split('.')[1]) {
                    fileRef = storageRef.child(this.props.file.name.split('.')[0]);
                } else {
                    fileRef = storageRef.child(this.props.file.name);
                }
            }
            if (this.state.photoName) {
                fileRef = storageRef.child(this.state.photoName);
            }
            this.props.onLoading(true)
            if (this.props.file.name) {
                fileRef.put(this.props.file)
                    .then((snap) => {
                        console.log('upload successful', snap);
                        this.props.onLoading(false);
                        this.resetFirstSelectCall(this.state.choseFolder, false, "Past");
                        this.resetSecondSelectCall(this.state.choseFolder, true, "Recent");
                    })
                    .catch((err) => console.error('error uploading file', err));
            } else {
                fileRef.putString(this.props.file, 'data_url', { contentType: 'image/png' })
                    .then((snap) => {
                        console.log('upload successful', snap);
                        this.props.onLoading(false)
                        this.resetFirstSelectCall(this.state.choseFolder, false, "Past");
                        this.resetSecondSelectCall(this.state.choseFolder, true, "Recent");
                    })
                    .catch((err) => console.error('error uploading file', err));
            }
        }
    }

    handleFolderSelectChange = (event) => {
        if (event.target.value) {
            this.setState({ choseFolder: event.target.value });
        } else {
            this.setState({
                choseFolder: '',
            });
        }
    }

    handleFirstSelectChange = (event) => {
        if (event.target.value) {
            firebaseStorage.ref().child(event.target.value).getDownloadURL().then((url) => {
                this.props.onFirstImageChanged(url)
            }).catch(function (error) {
                console.log(error)
            });
        }
    }

    handleSecondSelectChange = (event) => {
        if (event.target.value) {
            firebaseStorage.ref().child(event.target.value).getDownloadURL().then((url) => {
                this.props.onSecondImageChanged(url);
                this.props.onUseCropChanged(false);
            }).catch(function (error) {
                console.log(error)
            });
        }
    }

    handlePhotoNameChange = (event) => {
        if (event.target.value) {
            this.setState({ photoName: event.target.value });
        } else {
            this.setState({ photoName: '' });
        }
    }

    handleSetName = () => {
        if (this.props.file) {
            let name = getForatedDate();
            this.setState({ photoName: name });
        }
    }

    handleCropImage = () => {
        this.props.onCropConfirmed(true);
    };

    handleLoading = (loading) => {
        this.props.onLoading(loading);
    }

    resetFirstSelect = (method) => {
        this.resetFirstSelectCall = method;
    }

    resetSecondSelect = (method) => {
        this.resetSecondSelectCall = method;
    }

    handleDialogMessageClose = () => {
        this.setState({ open: false, error: '' });
        event.preventDefault();
    };

    render() {
        return <div>
            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}>
                <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
                    <Paper elevation={1} style={{ width: "100%" }}>
                        <SelectImage onLoading={this.handleLoading}
                            onChange={this.handleFirstSelectChange}
                            folder={this.state.choseFolder}
                            reverse={false}
                            noneName={"Past"}
                            resetData={this.resetFirstSelect} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
                    <Paper elevation={1} style={{ width: "100%" }}>
                        <SelectImage onLoading={this.handleLoading}
                            onChange={this.handleSecondSelectChange}
                            folder={this.state.choseFolder}
                            reverse={true}
                            noneName={"Recent"}
                            resetData={this.resetSecondSelect} />
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={2} style={{ textAlign: "center" }}>
                    <Button variant="contained" component="label" color="primary" size="small">
                        Upload image
                        <input type="file" onChange={this.handleSecondImageSubmit} style={{ display: "none" }} />
                    </Button>
                </Grid>
                <Grid item xs={4} sm={2} style={{ textAlign: "center" }}>
                    <Button variant="contained" component="label" color="secondary" size="small" disabled={!this.props.src2 ? true : false}>
                        Load to storage
                        <input onClick={this.loadToFirebase} style={{ display: "none" }} />
                    </Button>
                </Grid>
                <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
                    <SelectFolder onLoading={this.handleLoading} onChange={this.handleFolderSelectChange} folder={this.props.rootFolder} noneName={"Folders"} />
                </Grid>
                <Grid item xs={8} sm={4} style={{ textAlign: "center" }}>
                    <TextField id="outline" label="Photo name" variant="outlined" size="small" value={this.state.photoName} onClick={this.handleSetName} onChange={this.handlePhotoNameChange} disabled={!this.props.file ? true : false} />
                </Grid>
                {this.props.useCrop ? <Grid item xs={4} sm={1} style={{ textAlign: "center" }}>
                    <Button variant="contained" component="label" color="secondary" size="small">
                        Crop
                        <input onClick={this.handleCropImage} style={{ display: "none" }} />
                    </Button>
                </Grid> : ''}
            </Grid>
            <DialogMessage open={this.state.open}
                title={"Error"}
                error={this.state.error}
                handleClose={this.handleDialogMessageClose}
            />
        </div >
    }
}

export default CompareImages