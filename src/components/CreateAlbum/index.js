import { connect } from "react-redux";
import { useState } from "react";
import GridView from "../GridView";
import Popup from "../Popup";
import Button from "../Button";
import Input from "../Input";
const CreateAlbum = ({ close, size, reload, photoSelected, submit }) => {
  const [name, setName] = useState("New Album");
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
      <Popup.Header close={close}>Create Album</Popup.Header>
      <Popup.Body>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "5px" }}>Input name</div>
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder="New Album"
          />
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
          Create
        </Button>
        <Button buttonType="text" onClick={close}>
          Cancel
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
