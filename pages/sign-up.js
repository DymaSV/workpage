import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import firebase from "@firebase/app";
import "@firebase/auth";
import { fail } from 'assert';

class SingUp extends React.Component {
    constructor(props) {
        super(props);
        this.config = {
            apiKey: process.env.REACT_APP_FIREBASE_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
            databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID
        };
        this.state = { email: '', password: '', open: false, error:'' };
    }

    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(this.config);
        }
    }

    handleSignUp = (event) => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({ open: false, error: '' });
                this.props.handelAuth(true);
            })
            .catch((ex) => {
                this.setState({ open: true, error: ex.message });
                console.log(ex)
                this.props.handelAuth(false);
            });
        event.preventDefault();
    }

    handleEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    handleClose = () => {
        this.setState({ open: false, error: '' });
        event.preventDefault();
    };

    render() {
        return <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <Paper elevation={3} style={{ width: "50%", textAlign: "center" }}>
                    <Grid item xs={12} >
                        <TextField
                            required
                            id="outlined-required"
                            name="email"
                            label="Email"
                            variant="outlined"
                            size="small"
                            onChange={this.handleEmail}
                            style={{ margin: "5px 5px 15px 5px" }}
                        />
                        <TextField
                            id="standard-password-input"
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            size="small"
                            onChange={this.handlePassword}
                            style={{ margin: "5px 5px 15px 5px" }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" component="label" color="primary" size="medium" style={{ margin: "5px 5px 15px 5px" }} >
                            SingUp
                            <input onClick={this.handleSignUp} style={{ display: "none" }} />
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.state.error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}

export default SingUp