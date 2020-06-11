import Grid from '@material-ui/core/Grid';
import Image from './image'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export default function Home() {
  return (
    <CompareImages />
  )
}

class CompareImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { src1: '', src2: '' };
  }

  handleFirstImageSubmit = (event) => {
    let file = event.target.files[0]
    var reader = new window.FileReader();
    if (file) {
      var url = reader.readAsDataURL(file);
    }
    console.log(reader)
    reader.onloadend = function (e) {
      this.setState({ src1: [reader.result] });
    }.bind(this);
  }

  handleSecondImageSubmit = (event) => {
    let file = event.target.files[0]
    var reader = new window.FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    console.log(reader)
    reader.onloadend = () => {
      this.setState({ src2: [reader.result] });
    }
  }

  render() {
    return <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center">
        <Grid item xs={6} style={{textAlign: "center"}}>
          <Paper elevation={1}>
            <Button variant="contained" component="label" color="primary" size="small">
              Upload First Image
            <input type="file" onChange={this.handleFirstImageSubmit} style={{ display: "none" }} />
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6} style={{textAlign: "center"}}>
          <Paper elevation={1}>
            <Button variant="contained" component="label" color="primary" size="small">
              Upload Second Image
            <input type="file" onChange={this.handleSecondImageSubmit} style={{ display: "none" }} />
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} style={{padding: 5}}>
          <Image src1={this.state.src1} src2={this.state.src2} />
        </Grid>
      </Grid>
    </div >
  }
}


