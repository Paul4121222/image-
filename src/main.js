import { Route, Routes, Navigate } from "react-router-dom";
import SideBarContainer from "./container/SidebarContainer";
import AlbumContainer from "./container/AlbumContainer";
import PhotoContainer from "./container/PhotoContainer";
import TrashContainer from "./container/TrashContainer";
import HeaderContainer from "./container/HeaderContainer";

const Main = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HeaderContainer />
      <div style={{ display: "flex", flexGrow: 1 }}>
        <SideBarContainer />
        <Routes>
          <Route path="/" element={<PhotoContainer />} />
          <Route path="/album" element={<AlbumContainer />} />
          <Route path="/trash" element={<TrashContainer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
