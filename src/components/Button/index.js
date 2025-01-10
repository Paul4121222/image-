import styled from "styled-components";
import Icon from "../Icon";

const CleanButton = styled.button`
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
`;

const ButtonContainer = styled(CleanButton)`
  background: #fff;
  padding: 7px 22px;
  border: 1px solid #2f2f2f;
  border-radius: 4px;
`;

const IconContainer = styled(CleanButton)`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ width }) => `${width / 2}px`};

  &:hover {
    background: #f4faff;
  }
`;

const Button = ({
  buttonType,
  children,
  iconName,
  iconWidth,
  iconHeight,
  iconStyle,
  ...rest
}) => {
  switch (buttonType) {
    case "text":
      return <ButtonContainer {...rest}>{children}</ButtonContainer>;
    case "icon":
      return (
        <IconContainer {...rest}>
          <Icon
            name={iconName}
            width={iconWidth}
            height={iconHeight}
            style={iconStyle}
          />
        </IconContainer>
      );
  }
};

export default Button;
