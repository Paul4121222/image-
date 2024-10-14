import { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";

const PopupProvider = ({ children }) => {
  const [popups, setPopups] = useState([]);

  const addPopup = useCallback((comp, id) => {
    setPopups((popups) => [...popups, { comp, id }]);
  }, []);

  const removePopup = useCallback((id) => {
    setPopups((popups) => popups.filter((popup) => popup.id !== id));
  }, []);

  useEffect(() => {
    window.addPopup = addPopup;
    window.removePopup = removePopup;
  }, []);

  return (
    <>
      {children}
      {ReactDOM.createPortal(
        popups.map((popup) => popup.comp),
        document.getElementById("popup")
      )}
    </>
  );
};

const PromiseHOC = (Component) => (props) => {
  const id = Math.random();

  const unmount = () => {
    window.removePopup(id);
  };

  return new Promise((resolve, reject) => {
    window.addPopup(
      <div className="popup" key={id}>
        <Component
          {...props}
          submit={(props) => {
            resolve({ ...props, unmount });
          }}
          close={(props) => {
            reject({ ...props, unmount });
          }}
        />
      </div>,
      id
    );
  });
};

export { PromiseHOC };
export default PopupProvider;
