import PathTab from './path-tab'
import Image from './image'

export default function Home() {
  return (
    <CompareImages/>
  )
}

class CompareImages extends React.Component {
  constructor(props){
    super(props);
    this.state = {src1: '', src2:''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    this.setState({src1: event.src1, src2: event.src2});
    console.log(event.src2)
  }
  render() {
    return <div>
      <PathTab handleSubmitForm={this.handleSubmit} src1={this.state.src1} src2={this.state.src2}/>
      <Image src1={this.state.src1} src2={this.state.src2}/>
    </div >
  }
}


