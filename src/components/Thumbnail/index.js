import { useState } from "react";
import { imgLoader } from "../../utility";
import CheckBox from "../CheckBox";
const Thumbnail = ({ path, style, isSelected, ...rest }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      style={{
        ...style,
        position: "relative",
      }}
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      {...rest}
    >
      <div
        style={{
          backgroundImage: `url(${imgLoader(path)})`,
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
        }}
      />
      {isHover || isSelected ? (
        <CheckBox
          checked={isSelected}
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            fill: "#fff",
          }}
        />
      ) : null}
    </div>
  );
};

export default Thumbnail;
