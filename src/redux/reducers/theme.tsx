import { THEME } from "../actionTypes";

const initialState = {
  theme: { mode: "light" },
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case THEME:
      return Object.assign({}, state, {
        theme: action.theme,
      });
    default:
      return state;
  }
}
