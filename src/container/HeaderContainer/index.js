import Button from "../../components/Button";
import Icon from "../../components/Icon";
const HeaderContainer = () => {
  return (
    <div
      style={{
        height: "58px",
        display: "flex",
        alignItems: "center",
        padding: "0 15px",
        backgroundColor: "rgb(232, 233, 235)",
      }}
    >
      <Icon name="fill_logo" height={40} width={40} />
      <h2 style={{ margin: "0 0 0 24px" }}>PhotoHub</h2>
      <div style={{ flexGrow: 1 }} />
      <Icon name="fill_upload" width={24} height={24} />
      <Button
        buttonType="icon"
        iconName="fill_more"
        width={36}
        height={36}
        iconWidth={24}
        iconHeight={24}
        hasHoverEffect
      />
    </div>
  );
};

export default HeaderContainer;
