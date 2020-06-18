import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogMessage from './dialog-message';
import Firebase from "./init-firebase";

class SingUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = { email: '', password: '', open: false, error: '' };
    }

    handleSignUp = (event) => {
        Firebase.firebaseInstance.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
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

    handleDialogMessageClose = () => {
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
            <DialogMessage open={this.state.open}
                title={"Error"}
                error={this.state.error}
                handleClose={this.handleDialogMessageClose}
            />
        </div>
    }
}

export default SingUp