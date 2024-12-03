import { AutoSizer, Table, Column } from "react-virtualized";
import { Component } from "react";
import "react-virtualized/styles.css";

class CustomTable extends Component {
  static defaultProps = {
    headerHeight: 30,
    height: 300,
    rowHeight: 30,
    width: 300,
    list: [
      {
        name: "A",
        path: "aaa/bbb",
      },
      {
        name: "B",
        path: "ccc/bbb",
      },
      {
        name: "C",
        path: "ddd/eee",
      },
    ],
    columns: [
      {
        dataKey: "name",
        title: "Name",
        width: 80,
      },
      {
        dataKey: "path",
        title: "Path",
        width: 100,
      },
    ],
  };

  columnsRender = () => {
    return this.props.columns.map((column) => (
      <Column
        key={column.dataKey}
        label={column.title}
        dataKey={column.dataKey}
        width={column.width}
        cellRenderer={
          column.render &&
          (() => {
            return column.render({});
          })
        }
      />
    ));
  };

  render() {
    const { width, height, headerHeight, rowHeight, list } = this.props;

    return (
      <Table
        width={width}
        height={height}
        headerHeight={headerHeight}
        rowHeight={rowHeight}
        rowCount={list.length}
        rowGetter={({ index }) => list[index]}
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
