import { SNACKBAR } from "../actionTypes";

const initialState = {
  snackbar: { message: "", open: false },
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SNACKBAR:
      return Object.assign({}, state, {
        snackbar: action.snackbar,
      });
    default:
      return state;
  }
}
