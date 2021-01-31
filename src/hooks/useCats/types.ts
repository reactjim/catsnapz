export type Cat = {
  id: string;
  url: string;
  sub_id: string;
};

export type Vote = {
  id: string;
  image_id: string;
  sub_id: string;
  value: number;
};

export type Fav = {
  id: string;
  image_id: string;
  sub_id: string;
};

export interface EnhancedCat extends Cat {
  isDisliked: boolean;
  isFav: boolean;
  isLiked: boolean;
  isOwner: boolean;
  likedTotal: number;
  dislikedTotal: number;
}

export enum actions {
  FETCH = "fetch",
  FETCH_FAILED = "fetch_failed",
  FETCH_SUCCESS = "fetch_success",

  FAVOURITE = "favourite",
  FAVOURITE_FAILED = "favourite_failed",
  FAVOURITE_ADDED = "favourite_added",
  FAVOURITE_REMOVED = "favourite_removed",

  VOTE = "vote",
  VOTE_FAILED = "vote_failed",
  VOTE_ADD = "vote_add",
  VOTE_REMOVE = "vote_remove",
  VOTE_UPDATE = "vote_update",
}

export type State = {
  cats: (Cat | null)[];
  favs: (Fav | null)[];
  votes: (Vote | null)[];
  loading: boolean;
  error: string | null;
};

export type Action =
  | { type: typeof actions.FETCH }
  | { type: typeof actions.FETCH_FAILED; error: string }
  | {
      type: typeof actions.FETCH_SUCCESS;
      cats: Cat[];
      favs: Fav[];
      votes: Vote[];
    }
  | { type: typeof actions.FAVOURITE }
  | { type: typeof actions.FAVOURITE_FAILED; error: string }
  | { type: typeof actions.FAVOURITE_REMOVED; image_id: string; sub_id: string }
  | { type: typeof actions.FAVOURITE_ADDED; fav: Fav }
  | { type: typeof actions.VOTE }
  | { type: typeof actions.VOTE_FAILED; error: string }
  | { type: typeof actions.VOTE_ADD; vote: Vote }
  | { type: typeof actions.VOTE_REMOVE; vote: Vote };
