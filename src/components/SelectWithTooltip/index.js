import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import enhanceWithClickOutside from "react-click-outside";

@enhanceWithClickOutside
class ClickOutSide extends React.Component {
  handleClickOutside() {
    this.props.onClickOutside();
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

const SelectWithTooltip = ({ children, text, showTooltip, closeTooltip }) => {
  //Tooltip預期children被span包住
  //https://stackoverflow.com/questions/45112294/invariant-violation-react-children-only-expected-to-receive-a-single-react-elem
  return (
    <Tooltip
      overlay={
        <ClickOutSide onClickOutside={closeTooltip}>{children}</ClickOutSide>
      }
      placement="bottomRight"
      visible={showTooltip}
    >
      <span>{text}</span>
    </Tooltip>
  );
};

export default SelectWithTooltip;
