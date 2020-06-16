
import SingUp from './sign-up'
import CompareImages from './compare-image'

export default function Home() {
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