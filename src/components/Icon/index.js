import SVG from "react-inlinesvg";
import { getIconPath } from "./iconLoader";

const Icon = ({ name, width = 20, height = 20, style }) => {
  return (
    <span style={{ display: "inline-flex" }}>
      <SVG
        src={getIconPath(name)}
        width={width}
        height={height}
        style={style}
      />
    </span>
  );
};

export default Icon;
