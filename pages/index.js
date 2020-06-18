
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
    this.state = { isAuth: false };
  }
  handelAuth = (event) => {
    this.setState({ isAuth: event });
  }

  render() {
    if (this.state.isAuth) {
      return (
        <CompareImages />
      )
    } else {
      return (
        <SingUp handelAuth={this.handelAuth} />
      )
    }
  }
}