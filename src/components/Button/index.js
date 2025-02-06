import styled from "styled-components";
import { forwardRef } from "react";
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
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ hasHoverEffect, width, height, hoverBackGroundColor }) =>
    hasHoverEffect &&
    `
    width: ${width}px;
    height: ${height}px;
    border-radius: ${width / 2}px;
    &:hover {
      background: ${hoverBackGroundColor || "#f4faff"};
    }
  `}
`;

const Button = forwardRef(
  (
    {
      buttonType,
      children,
      iconName,
      iconWidth,
      iconHeight,
      iconStyle,
      ...rest
    },
    ref
  ) => {
    switch (buttonType) {
      case "text":
        return (
          <ButtonContainer ref={ref} {...rest}>
            {children}
          </ButtonContainer>
        );
      case "icon":
        return (
          <IconContainer ref={ref} {...rest}>
            <Icon
              name={iconName}
              width={iconWidth}
              height={iconHeight}
              style={iconStyle}
            />
          </IconContainer>
        );
    }
  }
);

export default Button;
