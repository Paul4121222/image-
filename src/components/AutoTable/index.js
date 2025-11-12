import { AutoSizer, Table, Column } from "react-virtualized";
import { Component } from "react";
import { apiGetRemovePhotos } from "../../utility/api";

import "react-virtualized/styles.css";

class CustomTable extends Component {
  static defaultProps = {
    headerHeight: 30,
    height: 300,
    rowHeight: 30,
    width: 300,
  };

  state = {
    list: [],
  };

  columnsRender = () => {
    return this.props.columns.map((column) => (
      <Column
        key={column.dataKey}
        label={column.title}
        dataKey={column.dataKey}
        width={column.width}
        style={{ display: "flex", justifyContent: "center" }}
        cellRenderer={
          column.render &&
          (({ rowIndex }) => {
            return column.render({ row: this.state.list[rowIndex] });
          })
        }
      />
    ));
  };

  getData = () => {
    this.props.getData().then((list) => {
      this.setState({
        list,
      });
    });
  };
  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(preProps) {
    if (preProps.reloadKey !== this.props.reloadKey) {
      this.getData();
    }
  }
  render() {
    const { width, height, headerHeight, rowHeight } = this.props;
    console.log(height);
    return (
      <Table
        width={width}
        height={height}
        headerHeight={headerHeight}
        rowHeight={rowHeight}
        rowCount={this.state.list.length}
        rowGetter={({ index }) => this.state.list[index]}
        headerStyle={{ display: "flex", justifyContent: "center" }}
      >
        {this.columnsRender()}
      </Table>
    );
  }
}

const AutoTable = (props) => {
  return (
    <AutoSizer>
      {({ width, height }) => (
        <CustomTable width={width} height={height} {...props} />
      )}
    </AutoSizer>
  );
};

export default AutoTable;
