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
            <Grid item>
                <Paper elevation={1}>
                    <img id="myImg" src={this.props.src1} alt={this.props.text1} />
                </Paper>
            </Grid>
            <Grid item>
                <Paper elevation={1}>
                    <img id="myImg" src={this.props.src2} alt={this.props.text2} />
                </Paper>
            </Grid>
        </Grid>
    }
}


export default Image