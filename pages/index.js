
import SingUp from '../components/sign-up'
import Main from '../components/main'

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
        <Main rootFolder={this.state.rootFolder} />
      )
    } else {
      return (
        <SingUp handelAuth={this.handelAuth} />
      )
    }
  }
}