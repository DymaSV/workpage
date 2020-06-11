import Grid from '@material-ui/core/Grid';
import Image from './image'
import Paper from '@material-ui/core/Paper';

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
      var url = reader.readAsDataURL(file);
    }
    console.log(reader)
    reader.onloadend = function (e) {
      this.setState({ src2: [reader.result] });
    }.bind(this);
  }

  render() {
    return <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}>
        <Paper elevation={1}>
          <input type="file" onChange={this.handleFirstImageSubmit} />
        </Paper>
        <Paper elevation={1}>
          <input type="file" onChange={this.handleSecondImageSubmit} />
        </Paper>
      </Grid>
      <Image src1={this.state.src1} src2={this.state.src2} />
    </div >
  }
}


