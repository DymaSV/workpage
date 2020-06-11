import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class Image extends React.Component {
    
    render() {
        return <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={0}>
            <Grid item xs={6}>
                <Paper elevation={3}>
                    <img id="myImg" src={this.props.src1} alt="Image #1" width="100%"/>
                </Paper>
            </Grid>
            <Grid item xs={6} spacing={3}>
                <Paper elevation={3}>
                    <img id="myImg" src={this.props.src2} alt="Image #2" width="100%"/>
                </Paper>
            </Grid>
        </Grid>
    }
}


export default Image