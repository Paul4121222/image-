import Button from "../Button";

const ViewSelector = ({ size, changeSize }) => {
  return (
    <div style={{ width: "220px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {["small", "middle", "large"].map((item) => (
          <Button
            key={item}
            buttonType="icon"
            iconName={`fill_thunbail_${item}`}
            iconHeight={24}
            iconWidth={24}
            iconStyle={{ fill: size === item && "red" }}
            onClick={() => changeSize(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewSelector;
