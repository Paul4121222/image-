import Button from "../Button";
const CheckBox = ({ checked = false }) => {
  return (
    <Button
      buttonType="icon"
      iconName={checked ? "fill_checkbox_selected" : "fill_checkbox_normal"}
      iconHeight={18}
      iconWidth={18}
    />
  );
};

export default CheckBox;
