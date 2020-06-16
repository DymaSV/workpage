import Grid from '@material-ui/core/Grid';
import Image from './image'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';

import firebase from "@firebase/app";
import "@firebase/storage"

class CompareImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src1: '',
            src2: '',
            file: '',
            listSelectFirst: [],
            listSelectSecond: [],
            metadataFirst: [],
            metadataSecond: [],
            loading: false,
        };
        this.config = {
            apiKey: process.env.REACT_APP_FIREBASE_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
            databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
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
        const storageRef = firebase.storage().ref();
        let id = 0;
        // this.setState({
        //     listSelectFirst: [<option key={id} aria-label="None" value="" />]
        // });
        let array = [];
        storageRef.listAll().then((result) => {
            result.items.forEach((imageRef) => {
                imageRef.getMetadata()
                    .then((metadata) => {
                        id = 0;
                        this.setState({
                            listSelectFirst: [],
                            listSelectSecond: []
                        });
                        array.push(metadata);

                        array.sort(function (a, b) {
                            return new Date(a.timeCreated) > new Date(b.timeCreated);
                        }).forEach((item) => {
                            id++;
                            this.setState({
                                listSelectFirst: [...this.state.listSelectFirst, <option key={id} value={item.fullPath}>{item.fullPath}</option>]
                            });
                        });

                        id = 0;
                        array.reverse().forEach((item) => {
                            id++;
                            this.setState({
                                listSelectSecond: [...this.state.listSelectSecond, <option key={id} value={item.fullPath}>{item.fullPath}</option>]
                            });
                        });
                    })
                    .then(() => {

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            });
        });
    }

    loadToFirebase = () => {
        if (this.state.file) {
            const storageRef = firebase.storage().ref();
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
        var storage = firebase.storage();
        storage.ref().child(event.target.value).getDownloadURL().then((url) => {
            this.setState({ src1: url });
        }).catch(function (error) {
            console.log(error)
        });
    }

    handleSecondSelectChange = (event) => {
        var storage = firebase.storage();
        storage.ref().child(event.target.value).getDownloadURL().then((url) => {
            this.setState({ src2: url });
        }).catch(function (error) {
            console.log(error)
        });
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
                    <Button variant="contained" component="label" color="secondary" size="small">
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