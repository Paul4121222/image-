const getImgRadio = (img) => img.width / img.height;

const getRowHeight = (list, totalWidth) => {
  const totalRadio = list.reduce((acc, item) => {
    return acc + getImgRadio(item);
  }, 0);

  const rowHeight = totalWidth / totalRadio;
  return rowHeight;
};

const isInCheckRange = (targetHeight, idealHeight, range) => {
  return (
    idealHeight + range >= targetHeight && targetHeight >= idealHeight - range
  );
};

const getPossibleBreakPoints = (list, config, from) => {
  //從第一張照片開始考慮 (from)
  //問題是每次都要走完全部list

  const res = [];
  //to 代表換行點
  let to = from + 1;
  do {
    let targetList = list.slice(from, to + 1);
    const totalGap = (to - from) * config.contentGap;
    const rowHeight = getRowHeight(
      targetList,
      config.containerWidth - totalGap
    );

    //檢查是否符合理想高度
    const checkInRange = isInCheckRange(
      rowHeight,
      config.idealHeight,
      config.range
    );
    //console.log(rowHeight);
    if (checkInRange) {
      res.push({
        from,
        to,
        height: rowHeight,
      });
    }
    to++;
  } while (to < list.length);

  return res;
};

const parseBreakPoint = (tree, breakpoint, idealHeight) => {
  const id = breakpoint.to;
  const parentID = breakpoint.from === 0 ? 0 : breakpoint.from - 1;
  const cost = Math.abs(breakpoint.height - idealHeight) ** 2;
  const newData = {
    id,
    parentID,
    cost,
    totalCost: tree[parentID].totalCost + cost,
    height: breakpoint.height,
  };

  if (!tree[id]) {
    tree[id] = newData;
  } else {
    //避免誤差太大，跟理想高度有差距
    //使用比較少的cost建立tree
    if (tree[id].totalCost > newData.totalCost) {
      tree[id] = newData;
    }
  }
};

const createTree = (list, config) => {
  const data = {};
  data[0] = {
    id: 0,
    parentID: 0,
    cost: 0,
    totalCost: 0,
    height: 0,
  };
  //儲存換行的點
  let nextList = [];
  let init = true;
  do {
    let tempList = [];
    if (init) {
      const points = getPossibleBreakPoints(list, config, 0);
      for (let c of points) {
        //轉換為tree
        parseBreakPoint(data, c, config.idealHeight);
      }
      init = false;
      tempList = points.map((t) => t.to);
    } else {
      for (let n of nextList) {
        const points = getPossibleBreakPoints(list, config, n + 1);
        for (let c of points) {
          //轉換為tree
          parseBreakPoint(data, c, config.idealHeight);
        }
        tempList = [...tempList, ...points.map((t) => t.to)];
      }
    }
    //避免同一個換行點以及最後一個點不必計算
    nextList = [...new Set(tempList.filter((val) => val !== list.length - 1))];
  } while (nextList.length !== 0);

  return data;
};

const covertTreeToList = (tree, lastKey) => {
  let currentID = tree[lastKey].id;
  const res = [];
  while (currentID !== 0) {
    const item = tree[currentID];
    res.push({
      from: item.parentID === 0 ? 0 : item.parentID + 1,
      to: currentID,
      height: item.height,
    });
    currentID = item.parentID;
  }
  return res.reverse();
};

const handleRest = (rest, config) => {
  let currentIndex = 0;
  let rowWidthCounter = 0;
  const renderDateList = [];
  const row = [];

  //如果寬度是超過coontainerWidth的話，就直接用containerWidth當寬度，所以只會有一個data，否則就要重新計算高度
  while (rowWidthCounter <= config.containerWidth) {
    let item = rest[currentIndex];

    //rest為空，沒資料
    if (!item) {
      break;
    }
    let displayHeight = config.idealHeight;
    let displayWidth = (item.width / item.height) * config.idealHeight;

    if (displayWidth > config.containerWidth) {
      displayWidth = config.containerWidth;
      displayHeight = config.containerWidth * (item.height / item.width);
    }

    currentIndex++;
    rowWidthCounter += displayWidth;

    if (rowWidthCounter <= config.containerWidth) {
      row.push({
        ...item,
        displayHeight,
        displayWidth,
      });
    }
  }

  renderDateList.push(row);

  if (row.length < rest.length) {
    //還有剩餘
    for (let row of flexGrid(rest.slice(row.length), config)) {
      renderDateList.push(row);
    }
  }

  return renderDateList;
};

const flexGrid = (list, config) => {
  const tree = createTree(list, config);
  const treeKeys = Object.keys(tree);
  console.log(tree);
  let renderDataList = [];
  //從最後一個換行點開始，否則會有遺漏
  const lastTreeKey = treeKeys[treeKeys.length - 1];

  //如果list只有一個的話，代表沒有換行點
  if (treeKeys.length !== 1) {
    const treeList = covertTreeToList(tree, lastTreeKey);
    renderDataList = treeList.reduce((acc, listItem) => {
      const row = list.slice(listItem.from, listItem.to + 1);

      const newRow = row.map((rowItem) => ({
        ...rowItem,
        displayHeight: listItem.height,
        displayWidth: (rowItem.width / rowItem.height) * listItem.height,
      }));
      return [...acc, newRow];
    }, []);
  }

  //檢查是否有剩餘檔案，原因: 找不到換行點，containerWidth太小，照片太大
  const from = +lastTreeKey + (renderDataList.length === 0 ? 0 : 1);
  for (let row of handleRest(list.slice(from), config)) {
    renderDataList.push(row);
  }

  return renderDataList;
};

export default flexGrid;
