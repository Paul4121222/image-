import { Component } from "react";
import gridParser from "./gridParser";
import { debounce } from "../../utility";

class GridManager extends Component {
  static defaultProps = {
    config: {},
    renderKey: 0,
  };

  state = { data: [] };

  componentDidMount() {
    this.getInitData();
  }

  componentDidUpdate(preProps) {
    if (preProps.renderKey !== this.props.renderKey) {
      this.updateData();
    }
  }

  registerList = (ref) => {
    this.list = ref;
  };

  getInitData = async () => {
    this.section = await this.props.getData();
    const data = gridParser(this.section, this.props.config);
    this.setState({
      data,
    });
  };

  updateData = debounce(() => {
    this.getInitData().then(() => {
      this.list.recomputeRowHeights();
    });
  }, 2000);

  render() {
    return this.props.children({
      data: this.state.data,
      registerList: this.registerList,
    });
  }
}

export default GridManager;
