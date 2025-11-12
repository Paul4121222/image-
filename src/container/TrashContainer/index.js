import AutoTable from "../../components/AutoTable";
import CheckBox from "../../components/CheckBox";
import { apiGetRemovePhotos, apiDeleteItems } from "../../utility/api";
import { useState } from "react";
import {
  addToSelectedList,
  cancelSelectedList,
  cleanSelected,
  handleReload,
} from "../../slices/listSlice";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "../../components/Toolbar";
import { PromiseHOC } from "../../Provider/PopupProvider";
import Popup from "../../components/Popup";

const PromiseConfirm = PromiseHOC(Popup.Confirm);

const TrashContainer = () => {
  const [rowsActive, setRowsActive] = useState([]);
  const dispatch = useDispatch();
  const selectedList = useSelector((state) => state.list.selectedList);
  const reloadKey = useSelector((state) => state.list.reloadKey);
  const columns = [
    {
      dataKey: "checked",
      title: "",
      width: 60,
      render: ({ row }) => {
        const checked = selectedList.includes(row.id);
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CheckBox
              checked={checked}
              onClick={() => {
                dispatch(
                  checked
                    ? cancelSelectedList(row.id)
                    : addToSelectedList(row.id)
                );
              }}
            />
          </div>
        );
      },
    },
    {
      dataKey: "image",
      title: "Picture",
      width: 120,
      render: ({ row }) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={`/api/images/${row.id}`}
              width={60}
              height={60}
              style={{ objectFit: "cover" }}
            />
          </div>
        );
      },
    },
    {
      dataKey: "name",
      title: "Name",
      width: 200,
    },
    {
      dataKey: "dimension",
      title: "Dimension",
      width: 120,
    },
  ];

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
        left={<h3>Trash</h3>}
        itemSelected={selectedList}
        cleanSelected={() => dispatch(cleanSelected())}
        handleRemove={() => {
          PromiseConfirm({
            title: "要永久刪除檔案嗎",
            msg: "確定要刪除嗎? 檔案將會永久刪除",
            closeText: "取消",
            submitText: "確定",
          })
            .then(({ unmount }) => {
              unmount();
              apiDeleteItems({ ids: selectedList }).then(() => {
                dispatch(cleanSelected());
                dispatch(handleReload());
              });
            })
            .catch(({ unmount }) => unmount());
        }}
      />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <AutoTable
          columns={columns}
          getData={apiGetRemovePhotos}
          rowHeight={80}
          reloadKey={reloadKey}
        />
      </div>
    </div>
  );
};

export default TrashContainer;
