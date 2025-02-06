import Popup from "../Popup";
import Icon from "../Icon";
const About = ({ close }) => {
  return (
    <Popup
      style={{
        width: "250px",
        height: "300px",
      }}
    >
      <Popup.Header close={close}>About</Popup.Header>
      <Popup.Body
        style={{
          fontSize: "14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <Icon
          name="fill_logo"
          height={60}
          width={60}
          style={{ marginBottom: "40px" }}
        />
        This project is purely for learning and experimentation.
      </Popup.Body>
    </Popup>
  );
};

export default About;
