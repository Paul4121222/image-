import { InfiniteLoader, AutoSizer, List } from "react-virtualized";
import { connect } from "react-redux";
import ItemManager from "../../components/ItemManager";
import { getAlbumsCount, getAlbumsList } from "./apiTest";
import Toolbar from "../../components/Toolbar";
import {
  selectAlbum,
  cancelSelectAlbum,
  setTotal,
} from "../../slices/albumSlice";

const Album = ({ width, height, item, onClick, isAlbumSelected }) => {
  const info = item ? `${item.PhotoCount} 相片 ${item.VideoCount} 影片` : "";

  return (
    <div
      style={{
        margin: "0 15px 15px",
      }}
      onClick={onClick}
    >
      <div
        style={{
          cursor: "pointer",
          width,
          height,
          borderRadius: "8px",
          backgroundColor: item.background || "#eee",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          boxSizing: "border-box",
          borderWidth: isAlbumSelected ? "12px" : 0,
          borderColor: "rgb(186, 216, 255)",
          borderStyle: "solid",
          transition: "border-width .2s",
        }}
      >
        {item.cAlbumTitle}
      </div>

      <div
        style={{
          lineHeight: "20px",
          fontSize: "14px",
          color: "rgb(74, 74, 74)",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {info}
      </div>
    </div>
  );
};

const AlbumContainer = ({
  albumSelected,
  selectAlbum,
  cancelSelectAlbum,
  setTotal,
  albumTotal,
}) => {
  const rowRenderer =
    ({ rows, albumWidth, selectAlbum, cancelSelectAlbum }) =>
    ({ index, key, style }) => {
      const row = rows[index];

      return (
        <div
          key={key}
          style={{ ...style, display: "flex", alignItems: "center" }}
        >
          {row.map((item, index) => {
            const isAlbumSelected = albumSelected.includes(item.iPhotoAlbumId);

            return (
              <Album
                isAlbumSelected={isAlbumSelected}
                key={index}
                width={albumWidth}
                height={albumWidth}
                item={item}
                onClick={() => {
                  if (typeof item.iPhotoAlbumId === "undefined") return;
                  isAlbumSelected
                    ? cancelSelectAlbum(item.iPhotoAlbumId)
                    : selectAlbum(item.iPhotoAlbumId);
                }}
              />
            );
          })}
        </div>
      );
    };

  return (
    <div
      style={{
        flexGrow: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar
        left={
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3 style={{ marginRight: "20px" }}>相簿</h3> {albumTotal}個
          </div>
        }
      />

      <div style={{ flexGrow: 1 }}>
        <AutoSizer>
          {({ height, width }) => {
            return (
              <div style={{ marginLeft: "5px" }}>
                <ItemManager
                  width={width - 5}
                  getTotal={getAlbumsCount}
                  getList={getAlbumsList}
                  setTotal={setTotal}
                >
                  {({
                    rows,
                    loadMoreRows,
                    rowCount,
                    isRowLoaded,
                    albumWidth,
                    rowHeight,
                    registerInfiniteLoaderRef,
                    total,
                  }) => {
                    return (
                      <InfiniteLoader
                        loadMoreRows={loadMoreRows}
                        rowCount={rowCount}
                        isRowLoaded={isRowLoaded}
                        ref={(ref) => registerInfiniteLoaderRef(ref)}
                      >
                        {({ onRowsRendered, registerChild }) => (
                          <List
                            height={height}
                            onRowsRendered={onRowsRendered}
                            ref={registerChild}
                            rowCount={rowCount}
                            rowHeight={rowHeight}
                            rowRenderer={rowRenderer({
                              rows,
                              albumWidth,
                              selectAlbum,
                              cancelSelectAlbum,
                            })}
                            width={width - 5}
                          />
                        )}
                      </InfiniteLoader>
                    );
                  }}
                </ItemManager>
              </div>
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};

const mapStateToProps = ({ album }) => {
  return {
    albumSelected: album.albumSelected,
    albumTotal: album.totalCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectAlbum: (val) => {
      dispatch(selectAlbum(val));
    },
    cancelSelectAlbum: (val) => dispatch(cancelSelectAlbum(val)),
    setTotal: (val) => dispatch(setTotal(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumContainer);
