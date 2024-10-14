import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Main from "./main";
import "./assets/global.css";
import store from "./store";
import { Provider } from "react-redux";
import PopupProvider from "./Provider/PopupProvider";

const root = createRoot(document.querySelector("#root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PopupProvider>
        <Main />
      </PopupProvider>
    </BrowserRouter>
  </Provider>
);
