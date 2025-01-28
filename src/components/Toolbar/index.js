import styled from "styled-components";
import Button from "../Button";

const Toolbar = styled(
  ({
    left,
    right,
    className,
    itemSelected = [],
    cleanSelected,
    handleRemove,
  }) => {
    return (
      <div className={className}>
        {itemSelected.length ? (
          <>
            <Button
              buttonType="icon"
              iconName="fill_close"
              iconHeight={20}
              iconWidth={20}
              onClick={cleanSelected}
            />
            <div>
              <Button
                buttonType="icon"
                iconName="fill_trash_2"
                iconHeight={24}
                iconWidth={24}
                iconStyle={{ color: "rgb(255, 165, 79)" }}
                hoverBackGroundColor="#eee"
                width={36}
                height={36}
                hasHoverEffect
                onClick={handleRemove}
              />
            </div>
          </>
        ) : (
          <>
            <div>{left}</div>
            <div>{right}</div>
          </>
        )}
      </div>
    );
  }
)`
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default Toolbar;
