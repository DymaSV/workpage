import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class PathTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {src1: '', src2:''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
      }
    
      handleSubmit(event) {
        this.props.handleSubmitForm(this.state);
        console.log(this.state);
    }
    
    handleChange1(event) {
        this.setState({ src1: event.target.value });
    }

    handleChange2(event) {
        this.setState({ src2: event.target.value });
    }

    render() {
        return <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={0}>
            <form>
                <TextField id="standard-size-small" label="Path to photo" variant="outlined" size="small" onChange={this.handleChange1}/>
                <TextField id="standard-size-small" label="Path to photo" variant="outlined" size="small" onChange={this.handleChange2}/>
                <Button variant="contained" color="primary" onClick ={this.handleSubmit}>Compare photos</Button>
            </form>
        </Grid>
    }
}

export default PathTab