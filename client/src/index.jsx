import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./context.js";
import Store from "./store/store.js";
import postStore from "./store/store-post.js";

let store = new Store();

createRoot(document.getElementById("root")).render(
  <Context.Provider value={{ store, postStore }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);
