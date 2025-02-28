import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cleanPhotoSelected } from "../../slices/photoSlice";
import Icon from "../../components/Icon";
const SideBarContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemList = [
    {
      icon: "fill_photo_3",
      name: "Gallery",
      path: "/",
    },
    {
      icon: "fill_album_2",
      name: "Album",
      path: "/album",
    },
    {
      divide: true,
    },
    {
      icon: "fill_trash_2",
      name: "Trash",
      path: "/trash",
    },
  ];

  return (
    <div style={{ width: "68px", zIndex: 2 }}>
      <div
        css={`
          height: 100%;
          border-right: 1px solid #eee;
          width: 68px;
          background-color: rgb(232, 233, 235);
          transition: width 0.25s cubic-bezier(0.39, 0.58, 0.57, 1);
          display: flex;
          flex-direction: column;
          overflow: hidden;

          &:hover {
            width: 200px;
            transition-delay: 0.15s;

            .name {
              white-space: pre-line;
              opacity: 1 !important;
              transition-delay: 0.45s !important;
            }
          }
        `}
      >
        {itemList.map((item, index) => {
          if (item.divide) {
            return <div style={{ flexGrow: 1 }} key={index} />;
          }

          return (
            <div
              key={index}
              onClick={() => {
                dispatch(cleanPhotoSelected());
                navigate(item.path);
              }}
              css={`
                display: flex;
                align-items: center;
                margin: 4px 0;
                height: 40px;
                cursor: pointer;

                &:hover {
                  background-color: #f4faff;
                  font-weight: bold;
                }

                .icon {
                  width: 68px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-shrink: 0;
                }

                .name {
                  opacity: 0;
                  transition: opacity 0.15s cubic-bezier(0.39, 0.58, 0.57, 1);
                  white-space: nowrap;
                }
              `}
            >
              <div className="icon">
                <Icon name={item.icon} width={24} height={24} />
              </div>
              <div className="name">{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBarContainer;
