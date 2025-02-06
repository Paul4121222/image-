import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "../../components/Toolbar";
import SelectWithTooltip from "../../components/SelectWithTooltip";
import ViewSelector from "../../components/ViewSelector";
import {
  setSize,
  addPhotoSelected,
  removePhotoSelected,
  cleanPhotoSelected,
  handleReload,
} from "../../slices/photoSlice";
import Button from "../../components/Button";
import GridView from "../../components/GridView";
import { apiRemovePhoto } from "../../utility/api";
import { PromiseHOC } from "../../Provider/PopupProvider";
import Popup from "../../components/Popup";

const PromiseConfirm = PromiseHOC(Popup.Confirm);

const PhotoContainer = ({
  size,
  setSize,
  reload,
  basicQuery = {},
  back,
  cleanPhotoSelected,
  photoSelected,
  handleReload,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    return () => {
      cleanPhotoSelected();
    };
  }, []);

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
          itemSelected={photoSelected}
          cleanSelected={cleanPhotoSelected}
          handleRemove={() => {
            PromiseConfirm({
              title: "要刪除檔案嗎",
              msg: "確定要刪除嗎? 檔案將會移動到垃圾桶",
              closeText: "取消",
              submitText: "確定",
            })
              .then(({ unmount }) => {
                unmount();
                apiRemovePhoto({ ids: photoSelected }).then(() => {
                  cleanPhotoSelected();
                  handleReload();
                });
              })
              .catch(({ unmount }) => unmount());
          }}
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
                {location.state?.title || "Gallery"}
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
                  View
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
    photoSelected: state.photo.photoSelected,
  }),
  (dispatch) => ({
    setSize: (val) => {
      dispatch(setSize(val));
    },
    cleanPhotoSelected: () => {
      dispatch(cleanPhotoSelected());
    },
    handleReload: () => dispatch(handleReload()),
  })
)(PhotoContainer);
