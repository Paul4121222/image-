import { Route, Routes } from "react-router-dom";
import SideBarContainer from "./container/SidebarContainer";
import AlbumContainer from "./container/AlbumContainer";
import PhotoContainer from "./container/PhotoContainer";

const Main = () => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <SideBarContainer />
      <Routes>
        <Route path="/" element={<PhotoContainer />} />
        <Route path="/album" element={<AlbumContainer />} />
      </Routes>
    </div>
  );
};

export default Main;
