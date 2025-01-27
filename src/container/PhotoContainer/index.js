import { AutoSizer, List } from "react-virtualized";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
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
import Button from "../../components/Button";
import GridView from "../../components/GridView";
const PhotoContainer = ({ size, setSize, reload, basicQuery = {}, back }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
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
              {back ? (
                <>
                  <Button
                    buttonType="icon"
                    iconName="fill_back"
                    iconWidth={20}
                    iconHeight={20}
                    onClick={back}
                  />
                  <div
                    style={{
                      width: "1px",
                      height: "30px",
                      backgroundColor: "rgb(233, 233, 233)",
                      margin: "0px 10px",
                    }}
                  />
                </>
              ) : null}
              <h3 style={{ marginRight: "20px" }}>
                {location.state?.title || "照片牆"}
              </h3>
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
        <GridView
          config={config}
          reload={reload}
          basicQuery={basicQuery}
          size={size}
        />
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    size: state.photo.size,
    reload: state.photo.reload,
  }),
  (dispatch) => ({
    setSize: (val) => {
      dispatch(setSize(val));
    },
  })
)(PhotoContainer);
