// types
import { Action, actions, State } from "./types";

// defaults
export const initialState: State = {
  loading: false,
  error: null,
};

export default (state: State, action: Action) => {
  switch (action.type) {
    case actions.UPLOAD:
      return { ...state, error: null, loading: true };

    case actions.UPLOAD_FAILED:
      return { ...state, loading: false, error: action.error };

    case actions.UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
