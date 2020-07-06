import Paper from '@material-ui/core/Paper';
import NativeSelect from '@material-ui/core/NativeSelect';
import { firebaseStorage } from "../services/init-firebase";
import { sortByDate } from "./utils";

class SelectImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listSelect: [<option key={this.props.noneName + "_0"} aria-label="None" value="">{this.props.noneName}</option>]
        };
        this.props.resetData(this.createList);
    }

    componentDidUpdate(prevProps) {
        if (this.props.folder !== prevProps.folder) {
            this.createList(this.props.folder, this.props.reverse, this.props.noneName)
        }
    }

    createList = async (folder, reverse, noneName) => {
        if (!folder) {
            return;
        }
        this.props.onLoading(true)
        const storageRef = firebaseStorage.ref(folder);
        let id = 1;
        let metaArray = []
        this.setState({
            listSelect: [<option key={noneName + "_0"} aria-label="None" value="">{noneName}</option>],
        });
        let listAll = await storageRef.listAll();
        for (const imageRef of listAll.items) {
            const metadata = await imageRef.getMetadata()
            metaArray.push(metadata);
        }
        metaArray.sort(sortByDate())
        if (!reverse) {
            metaArray.forEach((item) => {
                this.setState({
                    listSelect: [...this.state.listSelect, <option key={noneName + "_" + id} value={item.fullPath}>{item.name}</option>]
                });
                id++;
            })
        } else {
            metaArray.reverse().forEach((item) => {
                this.setState({
                    listSelect: [...this.state.listSelect, <option key={noneName + "_" + id} value={item.fullPath}>{item.name}</option>]
                });
                id++;
            })
        }
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

export default SelectImage