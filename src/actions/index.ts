import { Actions } from "./types";
import { Action } from "../store/types";
import { InitialState } from "../view/types";

const searchReducer = (state: InitialState, action: Action): InitialState => {
    switch (action.type) {
        case Actions.CHANGE_VALUE: {
            return {
                ...state,
                filteredFiles: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default searchReducer;
