import { useRef } from "react";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { PromiseHOC } from "../../Provider/PopupProvider";
import Upload from "../../components/Upload";
import { apiUploadPhoto } from "../../utility/api";
import { handleReload } from "../../slices/photoSlice";
import { useDispatch } from "react-redux";
import { position } from "../../utility";
import Message from "../../components/Message";
import About from "../../components/About";
const PromiseUpload = PromiseHOC(Upload);
const PromiseAbout = PromiseHOC(About);
const HeaderContainer = () => {
  const moreBtnRef = useRef(null);

  const dispatch = useDispatch();
  return (
    <div
      style={{
        height: "58px",
        display: "flex",
        alignItems: "center",
        padding: "0 15px",
        backgroundColor: "rgb(232, 233, 235)",
      }}
    >
      <Icon name="fill_logo" height={40} width={40} />
      <h2 style={{ margin: "0 0 0 24px" }}>PhotoHub</h2>
      <div style={{ flexGrow: 1 }} />
      <Button
        buttonType="icon"
        iconName="fill_upload"
        iconWidth={24}
        iconHeight={24}
        width={36}
        height={36}
        hasHoverEffect
        onClick={() => {
          PromiseUpload()
            .then(({ unmount, files }) => {
              unmount();
              files
                .reduce((res, file) => {
                  return res.then(() => apiUploadPhoto(file));
                }, Promise.resolve())
                .then(() => {
                  dispatch(handleReload());
                });
            })
            .catch(({ unmount }) => {
              unmount();
            });
        }}
      />
      <Button
        ref={moreBtnRef}
        buttonType="icon"
        iconName="fill_more"
        width={36}
        height={36}
        iconWidth={24}
        iconHeight={24}
        hasHoverEffect
        onClick={() => {
          Message({
            message: "About",
            target: moreBtnRef.current,
            msgClick: () => {
              PromiseAbout().catch(({ unmount }) => unmount());
            },
          }).catch(({ unmount }) => unmount());
        }}
      />
    </div>
  );
};

export default HeaderContainer;
