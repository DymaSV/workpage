import Grid from '@material-ui/core/Grid';
import Image from './image'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import { firebaseStorage } from "./init-firebase";

class CompareImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src1: '',
            src2: '',
            file: '',
            listSelectFirst: [<option key={0} aria-label="None" value="">Past</option>],
            listSelectSecond: [<option key={0} aria-label="None" value="">Recent</option>],
            loading: false,
        };
    }

    classes = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));

    componentDidMount() {
        this.readFromFirebase()
    }

    handleSecondImageSubmit = (event) => {
        let file = event.target.files[0]
        var reader = new window.FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onloadend = () => {
            this.setState({ src2: [reader.result] });
            this.setState({ file: file });
        }
    }

    readFromFirebase = () => {
        const storageRef = firebaseStorage.ref();
        let id = 0;
        let metaArray = []
        storageRef.listAll().then((result) => {
            result.items.forEach((imageRef) => {
                imageRef.getMetadata()
                    .then((metadata) => {
                        metaArray.push(metadata);
                        console.log(metadata)
                        metaArray.sort((a, b) => {
                            var dateA = new Date(a.timeCreated);
                            var dateB = new Date(b.timeCreated);
                            if (dateA < dateB) {
                                return -1;
                            }
                            if (dateA > dateB) {
                                return 1;
                            }
                            return 0;
                        })

                        id = 1;
                        this.setState({
                            listSelectFirst: [<option key={0} aria-label="None" value="">Past</option>]
                        });
                        metaArray.forEach((item) => {
                            id++;
                            this.setState({
                                listSelectFirst: [...this.state.listSelectFirst, <option key={id} value={item.fullPath}>{item.fullPath}</option>]
                            });
                        })

                        id = 1;
                        this.setState({
                            listSelectSecond: [<option key={0} aria-label="None" value="">Recent</option>]
                        });
                        metaArray.reverse().forEach((item) => {
                            id++;
                            this.setState({
                                listSelectSecond: [...this.state.listSelectSecond, <option key={id} value={item.fullPath}>{item.fullPath}</option>]
                            });
                        })

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        });
    }

    loadToFirebase = () => {
        if (this.state.file) {
            const storageRef = firebaseStorage.ref();
            const fileRef = storageRef.child(this.state.file.name);
            this.setState({
                loading: true
            });
            fileRef.put(this.state.file)
                .then((snap) => {
                    console.log('upload successful', snap);
                    this.readFromFirebase();
                    this.setState({
                        loading: false
                    });
                })
                .catch((err) => console.error('error uploading file', err));
        }
    }

    handleFirstSelectChange = (event) => {
        if (event.target.value) {
            firebaseStorage.ref().child(event.target.value).getDownloadURL().then((url) => {
                this.setState({ src1: url });
            }).catch(function (error) {
                console.log(error)
            });
        }
    }

    handleSecondSelectChange = (event) => {
        if (event.target.value) {
            firebaseStorage.ref().child(event.target.value).getDownloadURL().then((url) => {
                this.setState({ src2: url });
            }).catch(function (error) {
                console.log(error)
            });
        }
    }

    render() {
        return <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}>
                <Grid item xs={4} style={{ textAlign: "center" }}>
                    <Paper elevation={1} style={{ width: "100%" }}>
                        <NativeSelect onChange={this.handleFirstSelectChange} style={{ width: "100%" }}>
                            {this.state.listSelectFirst}
                        </NativeSelect>
                    </Paper>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "center" }}>
                    <Paper elevation={1} style={{ width: "100%" }}>
                        <NativeSelect onChange={this.handleSecondSelectChange} style={{ width: "100%" }}>
                            {this.state.listSelectSecond}
                        </NativeSelect>
                    </Paper>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                    <Button variant="contained" component="label" color="primary" size="small">
                        Upload Second Image
                            <input type="file" onChange={this.handleSecondImageSubmit} style={{ display: "none" }} />
                    </Button>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                    <Button variant="contained" component="label" color="secondary" size="small" disabled={!this.state.src2 ? true : false}>
                        Load to Firebase
                            <input onClick={this.loadToFirebase} style={{ display: "none" }} />
                    </Button>
                </Grid>
                <Grid item xs={12} style={{ padding: 5, textAlign: "center" }}>
                    {this.state.loading ? <div className={this.classes.root}>
                        <LinearProgress />
                        <LinearProgress color="primary" />
                    </div> : <div></div>}
                </Grid>
                <Grid item xs={12} style={{ padding: 5 }}>
                    <Image src1={this.state.src1} src2={this.state.src2} />
                </Grid>
            </Grid>
        </div >
    }
}

export default CompareImages