import { Component } from "react";
import * as R from "ramda";
const getNumberOfItemsInRow = (width) => {
  return width < 567
    ? 2
    : width < 1170
    ? 4
    : width < 1920
    ? 6
    : width < 2560
    ? 8
    : width < 3840
    ? 10
    : 12;
};

class ItemManager extends Component {
  static defaultProps = {
    getTotal: () => {},
    getList: () => {},
    width: 0,
    setTotal: () => {},
    addFirstItem: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.width !== state.width) {
      return {
        width: props.width,
        albumWidth:
          Math.floor(props.width / getNumberOfItemsInRow(props.width)) - 30,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      albumWidth: 0,
      width: 0,
      total: 0,
    };
  }

  componentDidMount() {
    this.getInitData();
  }

  //在不同的視窗大小下，保持一致的視覺效果
  componentDidUpdate(preProps, preState) {
    if (preState.width !== this.state.width) {
      // When row height changes externally, let List know to reset its cached size
      this.infiniteLoader._registeredChild?.recomputeRowHeights();
    }

    if (preProps.reloadKey !== this.props.reloadKey) {
      this.props.getTotal().then(({ DataCount }) => {
        this.props.setTotal(DataCount);
        this.setState(
          {
            items: new Array(DataCount).fill(false),
            total: DataCount,
          },
          () => {
            this.infiniteLoader.resetLoadMoreRowsCache(true);
          }
        );
      });
    }
  }

  getInitData = () => {
    this.props.getTotal().then(({ DataCount }) => {
      this.props.setTotal(DataCount);
      this.setState({
        items: new Array(DataCount).fill(false),
        total: DataCount,
      });
    });
  };

  registerInfiniteLoaderRef = (ref) => {
    this.infiniteLoader = ref;
  };

  loadMoreRows = async ({ startIndex, stopIndex }) => {
    const list = await this.props
      .getList(startIndex, stopIndex)
      .then(({ result }) => {
        return result;
      });
    console.log(list);
    this.setState({ items: list });
  };

  //在渲染每一條row時，會去執行以下
  /* 兩次執行:
    1. init: 檢查可見範圍的row有無載入
    2. scroll: 會去抓當前可見範圍的row來看有無載入
  */
  isRowLoaded = ({ index }) => {
    const items = getNumberOfItemsInRow(this.props.width);

    const startIndex = index * items;
    let currentIndex = startIndex;
    while (
      currentIndex < startIndex + items &&
      currentIndex < this.state.total
    ) {
      if (!this.state.items[currentIndex]) {
        return false;
      }
      currentIndex++;
    }

    return true;
  };

  getRows = () => {
    return R.splitEvery(
      getNumberOfItemsInRow(this.props.width),
      this.state.items
    );
  };

  render() {
    const rows = this.getRows();

    return this.props.children({
      rows,
      loadMoreRows: this.loadMoreRows,
      rowCount: rows.length,
      isRowLoaded: this.isRowLoaded,
      albumWidth: this.state.albumWidth,
      rowHeight: this.state.albumWidth + 15 + 20,
      registerInfiniteLoaderRef: this.registerInfiniteLoaderRef,
      total: this.state.total,
    });
  }
}

export default ItemManager;
