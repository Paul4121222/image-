import { AutoSizer, List } from "react-virtualized";
import { connect } from "react-redux";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridManager from "../../components/GridManager";
import Toolbar from "../../components/Toolbar";
import SelectWithTooltip from "../../components/SelectWithTooltip";
import ViewSelector from "../../components/ViewSelector";
import {
  setSize,
  addPhotoSelected,
  removePhotoSelected,
} from "../../slices/photoSlice";
import Thumbnail from "../../components/Thumbnail";
import { apiGetPhotoList } from "../../utility/api";

const PhotoContainer = ({ size, setSize }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const dispatch = useDispatch();
  const photoSelected = useSelector((state) => state.photo.photoSelected);

  const config = {
    small: {
      containerWidth: window.innerWidth,
      contentGap: 5,
      idealHeight: 100,
      range: 20,
      segmentGap: 10,
    },
    middle: {
      containerWidth: window.innerWidth,
      contentGap: 5,
      idealHeight: 200,
      range: 50,
      segmentGap: 10,
    },
    large: {
      containerWidth: window.innerWidth,
      contentGap: 5,
      idealHeight: 400,
      range: 50,
      segmentGap: 10,
    },
  };

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
          }}
          key={key}
        >
          {row.columns.map((item, index) => {
            const isSelected = photoSelected.includes(item.id);
            return (
              <Thumbnail
                key={index}
                style={{
                  marginLeft: index === 0 ? 0 : config[size].contentGap,
                  width: item.displayWidth,
                  height: item.displayHeight,
                }}
                isSelected={isSelected}
                path={`/api/list/${item._id}`}
                onClick={() => {
                  if (isSelected) {
                    dispatch(removePhotoSelected(item.id));
                  } else {
                    dispatch(addPhotoSelected(item.id));
                  }
                }}
              />
            );
          })}
        </div>
      );
    };

  return (
    <div
      style={{
        flexGrow: 1,
        overflow: "hidden",
        paddingRight: "15px",
        backgroundColor: "rgb(232, 233, 235)",
      }}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        <Toolbar
          left={
            <div style={{ display: "flex", alignItems: "center" }}>
              <h3 style={{ marginRight: "20px" }}>照片牆</h3>
            </div>
          }
          right={
            <SelectWithTooltip
              showTooltip={showTooltip}
              closeTooltip={() => {
                setShowTooltip(false);
              }}
              text={
                <div
                  style={{
                    width: 104,
                    height: 30,
                    padding: "0px 4px 0px 10px",
                    border: "1px solid rgb(138, 184, 224)",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                  onClick={() => {
                    setShowTooltip(true);
                  }}
                >
                  檢視
                </div>
              }
            >
              <ViewSelector
                size={size}
                changeSize={(val) => {
                  setSize(val);
                }}
              />
            </SelectWithTooltip>
          }
        />
        <AutoSizer>
          {({ width, height }) => {
            return (
              width && (
                <GridManager
                  config={{ ...config[size], containerWidth: width }}
                  renderKey={`${width}-${size}`}
                  getData={apiGetPhotoList}
                >
                  {({ data, registerList }) => {
                    return (
                      <List
                        ref={registerList}
                        width={width}
                        height={height}
                        rowCount={data.length}
                        rowHeight={({ index }) => data[index].displayHeight}
                        rowRenderer={rowRenderer(data)}
                      />
                    );
                  }}
                </GridManager>
              )
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    size: state.photo.size,
  }),
  (dispatch) => ({
    setSize: (val) => {
      dispatch(setSize(val));
    },
  })
)(PhotoContainer);
