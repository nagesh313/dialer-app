import { USER_LOGIN } from "../actionTypes";

const initialState = {
  profile: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, {
        profile: action.profile,
      });
    default:
      return state;
  }
}
