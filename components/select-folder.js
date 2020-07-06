import Paper from '@material-ui/core/Paper';
import NativeSelect from '@material-ui/core/NativeSelect';
import { firebaseStorage } from "../services/init-firebase";

class SelectFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listSelect: [<option key={this.props.noneName + "_0"} aria-label="None" value="">{this.props.noneName}</option>]
        };
    }

    componentDidMount() {
        this.createList(this.props.folder, this.props.noneName)
    }

    componentDidUpdate(prevProps) {
        if (this.props.folder !== prevProps.folder) {
            this.createList(this.props.folder, this.props.noneName)
        }
    }

    createList = async (folder, noneName) => {
        if (!folder) {
            return;
        }
        this.props.onLoading(true)
        const storageRef = firebaseStorage.ref(folder);
        let id = 1;
        this.setState({
            listSelect: [<option key={noneName + "_" + id} aria-label="None" value="">{noneName}</option>]
        });
        let listAll = await storageRef.listAll();
        listAll.prefixes.forEach((item) => {
            this.setState({
                listSelect: [...this.state.listSelect, <option key={noneName + id} value={item.fullPath}>{item.fullPath}</option>]
            });
            id++;
        });
        this.props.onLoading(false)
    }

    render() {
        return <div>
            <Paper elevation={1} style={{ width: "100%" }}>
                <NativeSelect onChange={this.props.onChange} style={{ width: "100%" }} disabled={!(this.state.listSelect.length > 1)}>
                    {this.state.listSelect}
                </NativeSelect>
            </Paper>

        </div >
    }
}

export default SelectFolder