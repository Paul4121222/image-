import { InfiniteLoader, AutoSizer, List } from "react-virtualized";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import ItemManager from "../../components/ItemManager";
import Toolbar from "../../components/Toolbar";
import {
  selectAlbum,
  cancelSelectAlbum,
  setTotal,
  cleanSelectedAlbum,
  setReloadKey,
} from "../../slices/albumSlice";
import {
  apiGetAlbumsTotal,
  apiGetAlbums,
  apiCreateAlbum,
  apiDeleteAlbums,
} from "../../utility/api";
import Button from "../../components/Button";
import CreateAlbum from "../../components/CreateAlbum";
import { PromiseHOC } from "../../Provider/PopupProvider";
import { cleanPhotoSelected } from "../../slices/photoSlice";
import CheckBox from "../../components/CheckBox";
import Popup from "../../components/Popup";

const PromiseCreateAlbum = PromiseHOC(CreateAlbum);
const PromiseConfirm = PromiseHOC(Popup.Confirm);

const Album = ({
  width,
  height,
  item,
  onClick,
  isAlbumSelected,
  selectAlbum,
  cancelSelectAlbum,
}) => {
  const info = item ? `${item.count} 相片` : "";

  return (
    <div
      style={{
        margin: "0 15px 15px",
        position: "relative",
      }}
      onClick={onClick}
    >
      <CheckBox
        checked={isAlbumSelected}
        onClick={(e) => {
          e.stopPropagation();
          isAlbumSelected ? cancelSelectAlbum(item.id) : selectAlbum(item.id);
        }}
        style={{
          position: "absolute",
          top: "5px",
          left: "5px",
          fill: "#fff",
        }}
      />
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
        {item.name}
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
  setReload,
  reloadKey,
  cleanPhotoSelected,
  cleanSelectedAlbum,
}) => {
  const navigate = useNavigate();

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
            const isAlbumSelected = albumSelected.includes(item.id);

            return (
              <Album
                isAlbumSelected={isAlbumSelected}
                key={index}
                width={albumWidth}
                height={albumWidth}
                selectAlbum={selectAlbum}
                cancelSelectAlbum={cancelSelectAlbum}
                item={item}
                onClick={() => {
                  if (isAlbumSelected) {
                    cancelSelectAlbum(item.id);
                    return;
                  }
                  navigate(`/album/${item.id}`, {
                    state: {
                      title: item.name,
                    },
                  });
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
        itemSelected={albumSelected}
        cleanSelected={cleanSelectedAlbum}
        handleRemove={() => {
          PromiseConfirm({
            title: "要刪除相簿嗎",
            msg: "相簿一旦刪除即無法復原，但當中的照片仍會保留",
            closeText: "取消",
            submitText: "確定",
          })
            .then(({ unmount }) => {
              unmount();
              apiDeleteAlbums({ ids: albumSelected }).then(() => {
                cleanSelectedAlbum();
                setReload();
              });
            })
            .catch(({ unmount }) => unmount());
        }}
        left={
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3 style={{ marginRight: "20px" }}>相簿</h3> {albumTotal}個
          </div>
        }
        right={
          <Button
            buttonType="text"
            onClick={() => {
              PromiseCreateAlbum()
                .then(({ unmount, photoSelected, name }) => {
                  unmount();
                  apiCreateAlbum({ photoSelected, name }).then(() => {
                    setReload();
                    cleanPhotoSelected();
                  });
                })
                .catch(({ unmount }) => {
                  unmount();
                });
            }}
          >
            建立相簿
          </Button>
        }
      />

      <div style={{ flexGrow: 1 }}>
        <AutoSizer>
          {({ height, width }) => {
            return (
              <div style={{ marginLeft: "5px" }}>
                <ItemManager
                  width={width - 5}
                  getTotal={apiGetAlbumsTotal}
                  getList={apiGetAlbums}
                  setTotal={setTotal}
                  addFirstItems
                  reloadKey={reloadKey}
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
    reloadKey: album.reloadKey,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectAlbum: (val) => {
      dispatch(selectAlbum(val));
    },
    cancelSelectAlbum: (val) => dispatch(cancelSelectAlbum(val)),
    setTotal: (val) => dispatch(setTotal(val)),
    setReload: () => dispatch(setReloadKey()),
    cleanPhotoSelected: () => dispatch(cleanPhotoSelected()),
    cleanSelectedAlbum: () => dispatch(cleanSelectedAlbum()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumContainer);
