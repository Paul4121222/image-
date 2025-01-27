import { connect } from "react-redux";
import { useState } from "react";
import GridView from "../GridView";
import Popup from "../Popup";
import Button from "../Button";
import Input from "../Input";
const CreateAlbum = ({ close, size, reload, photoSelected, submit }) => {
  const [name, setName] = useState("");
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
    <Popup style={{ width: "800px", height: "600px" }}>
      <Popup.Header close={close}>建立相簿</Popup.Header>
      <Popup.Body>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "5px" }}>輸入名稱</div>
          <Input onChange={(e) => setName(e.target.value)} />
        </div>

        <GridView size={size} reload={reload} config={config} />
      </Popup.Body>
      <Popup.Footer>
        <Button
          buttonType="text"
          onClick={() => {
            submit({
              photoSelected,
              name,
            });
          }}
        >
          建立
        </Button>
        <Button buttonType="text" onClick={close}>
          取消
        </Button>
      </Popup.Footer>
    </Popup>
  );
};

export default connect((state) => ({
  size: state.photo.size,
  reload: state.photo.reload,
  photoSelected: state.photo.photoSelected,
}))(CreateAlbum);
