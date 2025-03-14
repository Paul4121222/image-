import flexGrid from "./flexGrid";

const gridParser = (sections, config) => {
  const result = [];
  for (let i = 0; i <= sections.length - 1; i++) {
    const section = sections[i];
    const segment = section.segments;

    const list = segment.contents.map((item) => ({
      ...item,
      meta: {
        ...item.meta,
        sectionID: i,
      },
    }));
    // list為分群，避免一次計算太多降低效能
    const renderData = flexGrid(list, config);
    renderData.forEach((row) => {
      if (row.length) {
        result.push({
          columns: row,
          displayHeight: row[0].displayHeight + config.segmentGap,
        });
      }
    });
  }

  return result;
};

export default gridParser;
