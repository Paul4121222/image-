import { AutoSizer, List } from "react-virtualized";
import { useSelector, useDispatch } from "react-redux";
import GridManager from "../GridManager";
import { apiGetPhotoList } from "../../utility/api";
import Thumbnail from "../Thumbnail";
import { addPhotoSelected, removePhotoSelected } from "../../slices/photoSlice";
const GridView = ({ config, reload, basicQuery = {}, size }) => {
  const photoSelected = useSelector((state) => state.photo.photoSelected);
  const dispatch = useDispatch();
  const rowRenderer =
    (data) =>
    ({ style, index, key }) => {
      const row = data[index];
      return (
        <div
          style={{
            ...style,
            height: row.displayHeight,
            display: "flex",
            alignItems: "flex-end",
            paddingLeft: "20px",
          }}
          key={key}
        >
          {row.columns.map((item, index) => {
            const isSelected = photoSelected.includes(item._id);
            return (
              <Thumbnail
                key={index}
                style={{
                  marginLeft: index === 0 ? 0 : config[size].contentGap,
                  width: item.displayWidth,
                  height: item.displayHeight,
                }}
                isSelected={isSelected}
                path={`/api/images/${item._id}`}
                onClick={() => {
                  if (isSelected) {
                    dispatch(removePhotoSelected(item._id));
                  } else {
                    dispatch(addPhotoSelected(item._id));
                  }
                }}
              />
            );
          })}
        </div>
      );
    };

  return (
    <AutoSizer>
      {({ width, height }) =>
        width && (
          <GridManager
            config={{ ...config[size], containerWidth: width }}
            renderKey={`${width}-${size}-${reload}`}
            getData={() => apiGetPhotoList(basicQuery)}
          >
            {({ data, registerList }) => {
              return (
                <List
                  ref={registerList}
                  width={width}
                  height={height - 50}
                  rowCount={data.length}
                  rowHeight={({ index }) => data[index].displayHeight}
                  rowRenderer={rowRenderer(data)}
                />
              );
            }}
          </GridManager>
        )
      }
    </AutoSizer>
  );
};

export default GridView;
