import { Component } from "react";
import gridParser from "./gridParser";

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
      this.getInitData().then(() => {
        this.list.recomputeRowHeights();
      });
    }
  }

  registerList = (ref) => {
    this.list = ref;
  };

  getInitData = async () => {
    this.section = await this.props.getData();
    console.log(this.section);
    const data = gridParser(this.section, this.props.config);
    this.setState({
      data,
    });
  };

  render() {
    return this.props.children({
      data: this.state.data,
      registerList: this.registerList,
    });
  }
}

export default GridManager;
