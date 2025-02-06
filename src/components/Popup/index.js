import styled from "styled-components";
import Button from "../Button";
import Icon from "../Icon";

export const PopupContainer = styled.div`
  position: fixed;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(221, 221, 221);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 6px 0px;
  border-radius: 4px;
  z-index: 101;
  ${({ left, top }) =>
    left
      ? `left: ${left}px; top:${top}px;`
      : "left: 50%;top: 50%; transform: translate(-50%, -50%);"}

  display: flex;
  flex-direction: column;
`;

const Popup = ({ children, width, height, style = {} }) => {
  return (
    <PopupContainer
      style={{
        width,
        height,
        ...style,
      }}
    >
      {children}
    </PopupContainer>
  );
};

const Header = styled(({ children, className, close }) => {
  return (
    <div className={className}>
      {close ? (
        <Button
          buttonType="icon"
          iconName="fill_close"
          iconWidth={16}
          iconHeight={16}
          onClick={close}
          className="buttonWrapper"
        />
      ) : null}
      {children}
    </div>
  );
})`
  position: relative;
  height: 58px;
  font-size: 20px;
  font-weight: bold;
  color: rgb(0, 0, 0);
  padding: 0px 30px;
  display: flex;
  align-items: center;

  .buttonWrapper {
    position: absolute;
    top: 0px;
    right: 0px;
    display: inline-flex;
    padding: 10px;
  }
`;

const Body = styled(({ children, className, ...rest }) => {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
})`
  padding: 0 20px;
  flex-grow: 1;
`;

const Footer = styled(({ children, className }) => {
  return <div className={className}>{children}</div>;
})`
  display: flex;
  justify-content: flex-end;
  padding: 10px;

  &>*{
  &:not(:last-child){
    margin-right: 10px;
  }
`;

const Confirm = styled(
  ({
    style = { width: "400px", height: "160px" },
    close,
    title,
    msg,
    closeText,
    submitText,
    submit,
  }) => {
    return (
      <Popup style={style}>
        <Popup.Header close={close}>
          <Icon
            name="fill_warning"
            width={36}
            height={36}
            style={{ marginRight: "8px" }}
          />
          {title}
        </Popup.Header>
        <Popup.Body style={{ paddingLeft: "74px" }}>{msg}</Popup.Body>
        <Popup.Footer>
          {submitText ? (
            <Button buttonType="text" onClick={submit}>
              {submitText}
            </Button>
          ) : null}
          {closeText ? (
            <Button buttonType="text" onClick={close}>
              {closeText}
            </Button>
          ) : null}
        </Popup.Footer>
      </Popup>
    );
  }
)``;

Popup.Header = Header;
Popup.Body = Body;
Popup.Footer = Footer;
Popup.Confirm = Confirm;

export default Popup;
