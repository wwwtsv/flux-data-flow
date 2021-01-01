import FileStore from "./store";
import SearchFileView from "./view";
import searchReducer from "./actions";
import { InitialState } from "./view/types";

const initialState: InitialState = {
    files: ["action.ts", "store.ts", "view.ts", ".editorconfig", ".parcelrc"],
    filteredFiles: [],
};

const app = new SearchFileView();
const store = new FileStore(initialState, searchReducer);
store.subscribe(app);

app.render(store.getState());
app.searchFileHandler("search-input", store);
