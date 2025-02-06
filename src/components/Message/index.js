import enhanceWithClickOutside from "react-click-outside";
import React from "react";
import { PromiseHOC } from "../../Provider/PopupProvider";
import { PopupContainer } from "../Popup";
import { position } from "../../utility";

class Message extends React.Component {
  state = {
    left: 0,
    top: 0,
  };

  componentDidMount() {
    const { left, top } = position({
      target: this.props.target,
      current: this.msgRef,
      at: { left: "right-10", top: "bottom" },
    });
    this.setState({ left, top });
  }

  handleClickOutside() {
    this.props.close();
  }

  render() {
    const { message, msgClick } = this.props;
    const { left, top } = this.state;
    return (
      <PopupContainer
        ref={(ref) => (this.msgRef = ref)}
        left={left}
        top={top}
        style={{ padding: "10px", cursor: "pointer" }}
        onClick={() => {
          this.props.close();
          msgClick();
        }}
      >
        {message}
      </PopupContainer>
    );
  }
}

export default PromiseHOC(enhanceWithClickOutside(Message));
