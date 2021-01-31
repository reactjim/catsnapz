// types
import { Action, actions, State } from "./types";

// defaults
export const initialState: State = {
  cats: [],
  favs: [],
  votes: [],
  loading: false,
  error: null,
};

export default (state: State, action: Action) => {
  switch (action.type) {
    case actions.FETCH:
      return { ...state, loading: true };

    case actions.FETCH_FAILED:
      return { ...state, loading: false, error: action.error };

    case actions.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        cats: action.cats,
        favs: action.favs,
        votes: action.votes,
      };

    case actions.FAVOURITE:
      return { ...state, error: null };

    case actions.FAVOURITE_FAILED:
      return { ...state, error: action.error };

    case actions.FAVOURITE_ADDED:
      return {
        ...state,
        error: null,
        favs: [...state.favs, action.fav],
      };

    case actions.FAVOURITE_REMOVED:
      return {
        ...state,
        error: null,
        favs: state.favs.filter(
          (fav) =>
            fav.image_id !== action.image_id || fav.sub_id !== action.sub_id
        ),
      };

    case actions.VOTE:
      return { ...state, error: null };

    case actions.VOTE_FAILED:
      return { ...state, error: action.error };

    case actions.VOTE_ADD:
      return { ...state, votes: [...state.votes, action.vote] };

    case actions.VOTE_REMOVE:
      return {
        ...state,
        votes: state.votes.filter((vote) => vote.id !== action.vote.id),
      };

    default:
      return state;
  }
};
