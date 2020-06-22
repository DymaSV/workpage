
import SingUp from '../components/sign-up'
import CompareImages from '../components/compare-image'

export default function Index() {
  return (
    <App />
  )
}

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAuth: false, rootFolder: null };
  }
  handelAuth = (event) => {
    if (event) {
      let res = event.split("@");
      this.setState({ isAuth: true, rootFolder: res[0] });
    } else {
      this.setState({ isAuth: false });
      console.log("Logon s not correct!")
    }
  }

  render() {
    if (this.state.isAuth) {
      return (
        <CompareImages rootFolder={this.state.rootFolder} />
      )
    } else {
      return (
        <SingUp handelAuth={this.handelAuth} />
      )
    }
  }
}