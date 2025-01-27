import Popup from "../Popup";
import Button from "../Button";
import { useRef, useState, useEffect, useCallback } from "react";
import { apiUploadPhoto } from "../../utility/api";
const Upload = ({ close, submit }) => {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const addFiles = useCallback(
    (oldFiles) => {
      const newFiles = Array.from(oldFiles).filter((file) => {
        const format = file.type.split("/")[1];
        return ["jpg", "jpeg", "png"].includes(format);
      });

      console.log(newFiles);
      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  return (
    <Popup style={{ width: "800px", height: "550px" }}>
      <Popup.Header close={close}>Upload</Popup.Header>
      <div></div>
      <Popup.Body style={{ display: "flex", flexDirection: "column" }}>
        <input
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {
            addFiles(e.target.files);
          }}
        />
        <Button
          buttonType="text"
          style={{ display: "block", marginLeft: "auto" }}
          onClick={() => inputRef.current.click()}
        >
          Select File
        </Button>
        <div
          style={{
            marginTop: "10px",
            border: "3px dashed rgb(202, 202, 202)",
            padding: "10px",
            flexGrow: 1,
          }}
        >
          {files.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
      </Popup.Body>
      <Popup.Footer>
        <Button
          buttonType="text"
          onClick={() => {
            submit({ files });
          }}
        >
          Upload
        </Button>
        <Button buttonType="text" onClick={close}>
          Cancel
        </Button>
      </Popup.Footer>
    </Popup>
  );
};

export default Upload;
