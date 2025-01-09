import { Route, Routes, Navigate } from "react-router-dom";
import SideBarContainer from "./container/SidebarContainer";
import AlbumContainer from "./container/AlbumContainer";
import PhotoContainer from "./container/PhotoContainer";
import TrashContainer from "./container/TrashContainer";

const Main = () => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <SideBarContainer />
      <Routes>
        <Route path="/" element={<PhotoContainer />} />
        <Route path="/album" element={<AlbumContainer />} />
        <Route path="/trash" element={<TrashContainer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default Main;
