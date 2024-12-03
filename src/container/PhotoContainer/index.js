import { AutoSizer, List } from "react-virtualized";
import { connect } from "react-redux";
import { useState } from "react";
import GridManager from "../../components/GridManager";
import { imgLoader } from "../../utility";
import Toolbar from "../../components/Toolbar";
import SelectWithTooltip from "../../components/SelectWithTooltip";
import ViewSelector from "../../components/ViewSelector";
import { setSize } from "../../slices/photoSlice";

const PhotoContainer = ({ size, setSize }) => {
  const [showTooltip, setShowTooltip] = useState(false);

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
            return (
              <div
                key={index}
                style={{
                  marginLeft: index === 0 ? 0 : config[size].contentGap,
                  width: item.displayWidth,
                  height: item.displayHeight,
                }}
              >
                <div
                  style={{
                    backgroundImage: `url(${imgLoader(item.path)})`,
                    backgroundSize: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      );
    };

  return (
    <div style={{ flexGrow: 1, overflow: "hidden" }}>
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
