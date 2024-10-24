import { createContext } from "react";
import Store from "./store/store.js";
import postStore from "./store/store-post.js";

const store = new Store();

export const Context = createContext({
  store,
  postStore,
});
