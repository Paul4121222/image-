import SVG from "react-inlinesvg";
import { getIconPath } from "./iconLoader";

const Icon = ({ name, width = 20, height = 20 }) => {
  return (
    <span>
      <SVG src={getIconPath(name)} width={width} height={height} />
    </span>
  );
};

export default Icon;
