import Grid from '@material-ui/core/Grid';
import Image from './image'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';
import { firebaseStorage } from "../services/init-firebase";
import { sortByDate } from "../components/utils";

class CompareImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src1: '',
            src2: '',
            file: '',
            listSelectFirst: [<option key={"root_0"} aria-label="None" value="">Past</option>],
            listSelectSecond: [<option key={"second_0"} aria-label="None" value="">Recent</option>],
            listOfFolders: [<option key={"first_0"} aria-label="None" value="">Folders</option>],
            loading: false,
            rootFolder: this.props.rootFolder,
            choseFolder: ''

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
        this.readFoldersFirebase()
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

    readFoldersFirebase = async () => {
        const storageRef = firebaseStorage.ref(this.state.rootFolder);
        let id = 1;
        this.setState({
            listOfFolders: [<option key={"root_0"} aria-label="None" value="">Folders</option>]
        });
        let listAll = await storageRef.listAll();
        listAll.prefixes.forEach((item) => {
            this.setState({
                listOfFolders: [...this.state.listOfFolders, <option key={"root_" + id} value={item.fullPath}>{item.fullPath}</option>]
            });
            id++;
        });
    }

    readFromFirebase = async (folderPath) => {
        if (!folderPath) {
            return;
        }
        const storageRef = firebaseStorage.ref(folderPath);
        let id = 1;
        let metaArray = []
        this.setState({
            listSelectSecond: [<option key={"second_0"} aria-label="None" value="">Recent</option>],
            listSelectFirst: [<option key={"first_0"} aria-label="None" value="">Past</option>],
        });
        let listAll = await storageRef.listAll();
        listAll.items.forEach(async (imageRef) => {
            let metadata = await imageRef.getMetadata();
            metaArray.push(metadata);
            metaArray.sort(sortByDate())
            metaArray.forEach((item) => {
                this.setState({
                    listSelectFirst: [...this.state.listSelectFirst, <option key={"first_" + id} value={item.fullPath}>{item.fullPath}</option>]
                });
                id++;
            })
            id = 1;
            metaArray.reverse().forEach((item) => {
                this.setState({
                    listSelectSecond: [...this.state.listSelectSecond, <option key={"second_" + id} value={item.fullPath}>{item.fullPath}</option>]
                });
                id++;
            })

        });
    }

    loadToFirebase = () => {
        if (this.state.file) {
            const storageRef = firebaseStorage.ref(this.state.choseFolder);
            const fileRef = storageRef.child(this.state.file.name);
            this.setState({
                loading: true
            });
            fileRef.put(this.state.file)
                .then((snap) => {
                    console.log('upload successful', snap);
                    this.readFromFirebase(this.state.choseFolder);
                    this.setState({
                        loading: false
                    });
                })
                .catch((err) => console.error('error uploading file', err));
        }
    }

    handleFolderSelectChange = (event) => {
        if (event.target.value) {
            this.setState({ choseFolder: event.target.value });
            this.readFromFirebase(event.target.value + '/')
        } else {
            this.setState({
                choseFolder: '',
                listSelectSecond: [<option key={"second_0"} aria-label="None" value="">Recent</option>],
                listSelectFirst: [<option key={"first_0"} aria-label="None" value="">Past</option>],
            });
        }
    }

    handleFirstSelectChange = (event) => {
        if (event.target.value) {
            firebaseStorage.ref(this.state.rootFolder).child(event.target.value).getDownloadURL().then((url) => {
                this.setState({ src1: url });
            }).catch(function (error) {
                console.log(error)
            });
        }
    }

    handleSecondSelectChange = (event) => {
        if (event.target.value) {
            firebaseStorage.ref(this.state.rootFolder).child(event.target.value).getDownloadURL().then((url) => {
                this.setState({ src2: url });
            }).catch(function (error) {
                console.log(error)
            });
        }
    }

    render() {
        return <div>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    {"Tools"}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={3}>
                        <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
                            <Paper elevation={1} style={{ width: "100%" }}>
                                <NativeSelect onChange={this.handleFirstSelectChange} style={{ width: "100%" }} disabled={!this.state.choseFolder ? true : false}>
                                    {this.state.listSelectFirst}
                                </NativeSelect>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
                            <Paper elevation={1} style={{ width: "100%" }}>
                                <NativeSelect onChange={this.handleSecondSelectChange} style={{ width: "100%" }} disabled={!this.state.choseFolder ? true : false}>
                                    {this.state.listSelectSecond}
                                </NativeSelect>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} sm={2} style={{ textAlign: "center" }}>
                            <Button variant="contained" component="label" color="primary" size="small">
                                Upload image
                            <input type="file" onChange={this.handleSecondImageSubmit} style={{ display: "none" }} />
                            </Button>
                        </Grid>
                        <Grid item xs={4} sm={2} style={{ textAlign: "center" }}>
                            <Button variant="contained" component="label" color="secondary" size="small" disabled={!this.state.src2 ? true : false}>
                                Load to storage
                            <input onClick={this.loadToFirebase} style={{ display: "none" }} />
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
                            <NativeSelect onChange={this.handleFolderSelectChange} style={{ width: "100%" }}>
                                {this.state.listOfFolders}
                            </NativeSelect>
                        </Grid>
                        <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
                            <TextField id="outline" label="Photo name" variant="outlined" size="small" />
                        </Grid>
                        <Grid item xs={12} style={{ padding: 5, textAlign: "center" }}>
                            {this.state.loading ? <div className={this.classes.root}>
                                <LinearProgress />
                                <LinearProgress color="primary" />
                            </div> : <div></div>}
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <Grid item xs={12} style={{ padding: 5 }}>
                <Image src1={this.state.src1} src2={this.state.src2} />
            </Grid>
        </div >
    }
}

export default CompareImages