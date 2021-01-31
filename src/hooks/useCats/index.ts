import { useEffect, useContext, useMemo, useReducer } from "react";

// helpers
import { api } from "~helpers/api";
import { enhanceCats } from "~helpers/cats";
// context
import { AppContext } from "~contexts/app";
// state
import reducer, { initialState } from "./reducer";
// types
import { EnhancedCat, actions } from "./types";

interface CatState {
  cats: (EnhancedCat | null)[];
  setFavourite: (image_id: string) => Promise<void>;
  setLikeDislike: (image_id: string, value: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useCats = (): CatState => {
  const { userId } = useContext(AppContext);
  const [{ cats, favs, votes, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function getCats() {
    dispatch({ type: actions.FETCH });

    try {
      // sorry, not enough time to do fancy things so we're just getting all the
      // things and smashing them together! ;-)
      Promise.all([
        api.get("/images", {
          params: {
            limit: "24",
            size: "medium",
          },
        }),
        api.get("/votes"),
        api.get("/favourites"),
      ])
        .then((responses) => {
          const [catResponse, voteResponse, favResponse] = responses;

          if (
            catResponse.status !== 200 ||
            voteResponse.status !== 200 ||
            favResponse.status !== 200
          )
            throw Error();

          dispatch({
            type: actions.FETCH_SUCCESS,
            cats: catResponse?.data || [],
            favs: favResponse?.data || [],
            votes: voteResponse?.data || [],
          });
        })
        .catch(() => {
          dispatch({
            type: actions.FETCH_FAILED,
            error: "There was a problem fetching the listings",
          });
        });
    } catch (error) {
      dispatch({
        type: actions.FETCH_FAILED,
        error: "There was a problem fetching the listings",
      });
    }
  }

  const setFavourite = async (image_id: string): Promise<void> => {
    dispatch({ type: actions.FAVOURITE });

    try {
      const fav = favs.find(
        (item) => item.image_id === image_id && item.sub_id === userId
      );

      // if this cat already favourited, delete the favourite
      if (fav) {
        const { status } = await api.delete(`/favourites/${fav.id}`);

        if (status !== 200) throw Error();

        dispatch({
          type: actions.FAVOURITE_REMOVED,
          image_id: fav.image_id,
          sub_id: fav.sub_id,
        });
        // Otherwise add the favourite
      } else {
        const { data, status } = await api.post("/favourites", {
          image_id,
          sub_id: userId,
        });

        if (status !== 200) throw Error();

        dispatch({
          type: actions.FAVOURITE_ADDED,
          fav: { id: data?.id, image_id, sub_id: userId },
        });
      }
    } catch (error) {
      dispatch({
        type: actions.FAVOURITE_FAILED,
        error: "There was an issue saving your favourite",
      });
    }
  };

  const setLikeDislike = async (
    image_id: string,
    value: number
  ): Promise<void> => {
    // has this user already voted in some way
    const vote = votes.find(
      (vote) => vote.image_id === image_id && vote.sub_id === userId
    );

    // if no like vote found, log one
    if (!vote) {
      try {
        const { status, data } = await api.post("/votes", {
          image_id,
          sub_id: userId,
          value,
        });

        if (status !== 200) throw Error();

        dispatch({
          type: actions.VOTE_ADD,
          vote: { id: data?.id, image_id, sub_id: userId, value },
        });
      } catch (error) {
        dispatch({
          type: actions.VOTE_FAILED,
          error: "There was an issue saving your vote",
        });
      }
      return;
    }

    // if we already have a vote, then we'll just cancel it
    if (vote && vote.value === value) {
      try {
        const { status } = await api.delete(`/votes/${vote.id}`);

        if (status !== 200) throw Error();

        dispatch({
          type: actions.VOTE_REMOVE,
          vote,
        });
      } catch (error) {
        dispatch({
          type: actions.VOTE_FAILED,
          error: "There was an issue saving your vote",
        });
      }
      return;
    }

    // if we click the opposite to what we votes, change it
    if (vote && vote.value !== value) {
      try {
        Promise.all([
          api.delete(`/votes/${vote.id}`),
          api.post("/votes", {
            image_id,
            sub_id: userId,
            value,
          }),
        ])
          .then((responses) => {
            const [, { data }] = responses;

            dispatch({
              type: actions.VOTE_REMOVE,
              vote,
            });
            dispatch({
              type: actions.VOTE_ADD,
              vote: { id: data?.id, image_id, sub_id: userId, value },
            });
          })
          .catch(() => {
            throw Error();
          });
      } catch (error) {
        dispatch({
          type: actions.VOTE_FAILED,
          error: "There was an issue saving your vote",
        });
      }
      return;
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  // decorate the cat array with some additional properties relating to votes and favourites
  const enhancedCats = useMemo(() => {
    return enhanceCats(cats, favs, votes, userId);
  }, [cats, favs, votes]);

  return {
    cats: enhancedCats,
    setFavourite,
    setLikeDislike,
    loading,
    error,
  };
};
