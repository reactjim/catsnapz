import { Cat, EnhancedCat, Fav, Vote } from "~hooks/useCats/types";

/**
 * @description takes an array of cats and decorates with additional properties
 */
export const enhanceCats = (
  cats: Cat[],
  favs: Fav[],
  votes: Vote[],
  userId: string
): EnhancedCat[] =>
  cats.reduce((cats: EnhancedCat[], currentCat: Cat) => {
    // has current user favourited this cat?
    const isFav = !!favs.find(
      (fav) => fav.image_id === currentCat.id && fav.sub_id === userId
    );

    // has current user disliked this cat?
    const isDisliked = !!votes.find(
      (vote) =>
        vote.image_id === currentCat.id &&
        vote.sub_id === userId &&
        vote.value === 0
    );

    // has current used liked and total of likes
    const liked: {
      owner: boolean;
      likedTotal: number;
      dislikedTotal: number;
    } = votes.reduce(
      (acc, vote) => {
        const isLiked = !!votes.find(
          (vote) =>
            vote.image_id === currentCat.id &&
            vote.sub_id === userId &&
            vote.value === 1
        );

        const likedTotal =
          vote.value === 1 && vote.image_id === currentCat.id
            ? acc.likedTotal + 1
            : acc.likedTotal;
        const dislikedTotal =
          vote.value === 0 && vote.image_id === currentCat.id
            ? acc.dislikedTotal + 1
            : acc.dislikedTotal;

        return { owner: isLiked, likedTotal, dislikedTotal };
      },
      { owner: false, likedTotal: 0, dislikedTotal: 0 }
    );

    // is current user image owner?
    const isOwner = currentCat.sub_id === userId;

    return [
      ...cats,
      {
        ...currentCat,
        isDisliked,
        isFav,
        isLiked: liked.owner,
        isOwner,
        likedTotal: liked.likedTotal,
        dislikedTotal: liked.dislikedTotal,
      },
    ];
  }, []);
