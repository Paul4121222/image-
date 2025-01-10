import { imgLoader } from "../../utility";
import Button from "../../components/Button";
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
      <img src={imgLoader("logo.jpg")} height={50} width={50} />
      <h2 style={{ margin: "0 0 0 24px" }}>PhotoHub</h2>
      <div style={{ flexGrow: 1 }} />
      <Button
        buttonType="icon"
        iconName="fill_more"
        width={36}
        height={36}
        iconWidth={24}
        iconHeight={24}
      />
    </div>
  );
};

export default HeaderContainer;
